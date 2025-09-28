'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FlexibleInputProps {
  label: string
  type: 'text' | 'number' | 'currency' | 'percentage' | 'textarea'
  value: string
  onChange: (value: string) => void
  options?: string[]
  placeholder?: string
  language: 'en' | 'ar'
  required?: boolean
}

export default function FlexibleInput({
  label,
  type,
  value,
  onChange,
  options,
  placeholder,
  language,
  required = false
}: FlexibleInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const formatValue = (val: string) => {
    if (type === 'currency') {
      const num = parseFloat(val.replace(/[^\d.]/g, ''))
      return isNaN(num) ? '' : `$${num.toLocaleString()}`
    }
    if (type === 'percentage') {
      const num = parseFloat(val.replace(/[^\d.]/g, ''))
      return isNaN(num) ? '' : `${num}%`
    }
    return val
  }

  const parseValue = (val: string) => {
    if (type === 'currency') {
      return val.replace(/[^\d.]/g, '')
    }
    if (type === 'percentage') {
      return val.replace(/[^\d.]/g, '')
    }
    return val
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const rawValue = parseValue(e.target.value)
    onChange(rawValue)
  }

  const handleSelectChange = (selectedValue: string) => {
    onChange(selectedValue)
  }

  const inputClasses = `w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 ${isFocused ? 'border-purple-500/50' : ''}`

  if (options && options.length > 0) {
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
          {label}
          {required && <span className="text-red-400">*</span>}
        </Label>
        <Select value={value} onValueChange={handleSelectChange}>
          <SelectTrigger className={inputClasses}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-white/20 text-white">
            {options.map((option) => (
              <SelectItem 
                key={option} 
                value={option}
                className="bg-gray-900 text-white hover:bg-gray-800 focus:bg-gray-800"
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  if (type === 'textarea') {
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
          {label}
          {required && <span className="text-red-400">*</span>}
        </Label>
        <textarea
          value={formatValue(value)}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={inputClasses + " resize-none"}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3e%3cpath stroke='%23a855f7' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'%3e%3c/svg%3e")`,
            backgroundPosition: `right 0.5rem center`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `1.5em 1.5em`,
            paddingRight: `2.5rem`
          }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
        {label}
        {required && <span className="text-red-400">*</span>}
      </Label>
      <Input
        type={type === 'number' ? 'text' : type}
        value={formatValue(value)}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        required={required}
        className={inputClasses}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3e%3cpath stroke='%23a855f7' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'%3e%3c/svg%3e")`,
          backgroundPosition: `right 0.5rem center`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: `1.5em 1.5em`,
          paddingRight: `2.5rem`
        }}
      />
    </div>
  )
}