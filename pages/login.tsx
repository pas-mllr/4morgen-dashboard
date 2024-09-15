'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (email === 'suzan@4morgen.com' && password === '4morgen') {
      toast({
        title: "Login Successful",
        description: "Welcome back, Suzan!",
        duration: 3000,
      })
      router.push('/dashboard')
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-black text-white p-12 flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold">⚡️ 4Morgen</h1>
        </div>
        <div>
          <p className="text-xl mb-4">"This dashboard has revolutionized our business development approach. It provides clear insights into our activities and their impact, helping us make data-driven decisions. It's like having a roadmap to success right at our fingertips."</p>
          <p className="font-semibold">Pascal</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-between">
        <div className="self-end">
          <Button variant="ghost" onClick={() => router.push('/register')}>Create account</Button>
        </div>
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold mb-2">Log in to your account</h2>
          <p className="text-gray-600 mb-8">Enter your email and password below to access your account</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-20"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-sm bg-blue-100 text-blue-600 py-0.5 px-2 rounded">@4morgen.com</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button variant="link" onClick={() => router.push('/forgot-password')}>
              Forgot your password?
            </Button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 mt-8">
          By logging in, you agree to our{' '}
          <a href="#" className="underline">Terms of Service</a> and{' '}
          <a href="#" className="underline">Privacy Policy</a>.
        </div>
      </div>
    </div>
  )
}