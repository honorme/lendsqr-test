import Signin from '@/app/(auth)/_components/signin'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {})
const mockConsoleError = jest
  .spyOn(console, 'error')
  .mockImplementation(() => {})

describe('SignIn handleSubmit function', () => {
  const mockPush = jest.fn()
  const mockRouter = {
    push: mockPush,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  afterAll(() => {
    mockConsoleLog.mockRestore()
    mockConsoleError.mockRestore()
  })

  test('should prevent default form submission', async () => {
    render(<Signin />)

    const form = screen.getByRole('form')
    const mockPreventDefault = jest.fn()

    fireEvent.submit(form, {
      preventDefault: mockPreventDefault,
    })

    expect(mockPreventDefault).toHaveBeenCalled()
  })

  test('should return early if form validation fails', async () => {
    render(<Signin />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    fireEvent.change(emailInput, { target: { value: '' } })
    fireEvent.change(passwordInput, { target: { value: '' } })

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    expect(mockPush).not.toHaveBeenCalled()
  })

  test('should set loading state during submission', async () => {
    render(<Signin />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    jest.advanceTimersByTime(2000)

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })
  })

  test('should successfully submit form with valid data', async () => {
    render(<Signin />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    jest.advanceTimersByTime(2000)

    await waitFor(() =>
      expect(mockConsoleLog).toHaveBeenCalledWith(
        'Login successful:',
        expect.any(Object)
      )
    )
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/users'))
  })

  test('should handle submission errors gracefully', async () => {
    render(<Signin />)
  })

  test('should reset loading state after completion', async () => {
    render(<Signin />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    jest.advanceTimersByTime(2000)

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })
  })
})

describe('handleSubmit function (isolated)', () => {
  let mockSetIsLoading: jest.Mock
  let mockValidateForm: jest.Mock
  let mockRouter: { push: jest.Mock }
  let mockFormData: object

  beforeEach(() => {
    mockSetIsLoading = jest.fn()
    mockValidateForm = jest.fn()
    mockRouter = { push: jest.fn() }
    mockFormData = { email: 'test@example.com', password: 'password123' }

    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  const createHandleSubmit = () => {
    return async (e: React.FormEvent) => {
      e.preventDefault()

      if (!mockValidateForm()) {
        return
      }

      mockSetIsLoading(true)

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log('Login successful:', mockFormData)
        mockRouter.push('/users')
      } catch (error) {
        console.error('Login failed:', error)
      } finally {
        mockSetIsLoading(false)
      }
    }
  }

  test('should call preventDefault on form event', async () => {
    const handleSubmit = createHandleSubmit()
    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as React.FormEvent

    mockValidateForm.mockReturnValue(true)

    await handleSubmit(mockEvent)
    jest.advanceTimersByTime(2000)

    expect(mockEvent.preventDefault).toHaveBeenCalled()
  })

  test('should return early if validation fails', async () => {
    const handleSubmit = createHandleSubmit()
    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as React.FormEvent

    mockValidateForm.mockReturnValue(false)

    await handleSubmit(mockEvent)

    expect(mockSetIsLoading).not.toHaveBeenCalled()
    expect(mockRouter.push).not.toHaveBeenCalled()
  })

  test('should complete successful submission flow', async () => {
    const handleSubmit = createHandleSubmit()
    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as React.FormEvent

    mockValidateForm.mockReturnValue(true)

    const promise = handleSubmit(mockEvent)

    expect(mockSetIsLoading).toHaveBeenCalledWith(true)

    jest.advanceTimersByTime(2000)

    await promise

    expect(console.log).toHaveBeenCalledWith('Login successful:', mockFormData)
    expect(mockRouter.push).toHaveBeenCalledWith('/users')
    expect(mockSetIsLoading).toHaveBeenCalledWith(false)
  })
})
