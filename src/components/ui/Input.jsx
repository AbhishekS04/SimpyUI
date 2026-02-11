export default function Input({
  label,
  error,
  className = '',
  ...props
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-dark-50">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2.5 rounded-lg text-sm text-white placeholder-dark-200
          bg-dark-700 border border-dark-400/50
          focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50
          transition-all duration-200
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  )
}
