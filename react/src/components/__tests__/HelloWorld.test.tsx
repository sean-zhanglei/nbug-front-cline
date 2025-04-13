import React from 'react'
import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import HelloWorld from '../HelloWorld'

describe('HelloWorld Component', () => {
  test('renders initial message', () => {
    render(<HelloWorld />)
    expect(screen.getByText('Hello Vue 3!')).toBeInTheDocument()
  })

  test('reverses message on button click', () => {
    render(<HelloWorld />)
    fireEvent.click(screen.getByText('反转消息'))
    expect(screen.getByText('!3 euV olleH')).toBeInTheDocument()
  })

  test('increments counter', () => {
    render(<HelloWorld />)
    fireEvent.click(screen.getByText('增加'))
    expect(screen.getByText('翻倍计数: 2')).toBeInTheDocument()
  })

  test('toggles extra content', () => {
    render(<HelloWorld />)
    fireEvent.click(screen.getByText('隐藏'))
    expect(screen.getByText('显示更多')).toBeInTheDocument()
  })

  test('adds new item to list', () => {
    render(<HelloWorld />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'New Item' } })
    fireEvent.keyUp(input, { key: 'Enter' })
    expect(screen.getByText('New Item - 索引: 3')).toBeInTheDocument()
  })

  test('shows loading state', async () => {
    render(<HelloWorld />)
    expect(screen.getByText('加载中...')).toBeInTheDocument()
  })

  test('displays created time', () => {
    render(<HelloWorld />)
    expect(screen.getByText(/组件创建时间/)).toBeInTheDocument()
  })
})
