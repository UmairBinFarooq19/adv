/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

// Global inquiry/booking modal state. Any button anywhere calls openInquiry(pkg,
// mode) and the single <InquiryModal> (mounted once in the layout) opens with the
// package pre-selected. Keeping the modal singleton avoids duplicate forms and
// keeps focus management in one place.
const InquiryContext = createContext(null)

export function InquiryProvider({ children }) {
  const [state, setState] = useState({ open: false, pkg: null, mode: 'inquiry' })

  const openInquiry = useCallback((pkg = null, mode = 'inquiry') => setState({ open: true, pkg, mode }), [])
  const closeInquiry = useCallback(() => setState((s) => ({ ...s, open: false })), [])

  const value = useMemo(() => ({ ...state, openInquiry, closeInquiry }), [state, openInquiry, closeInquiry])
  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>
}

export function useInquiry() {
  const ctx = useContext(InquiryContext)
  if (!ctx) throw new Error('useInquiry must be used within InquiryProvider')
  return ctx
}
