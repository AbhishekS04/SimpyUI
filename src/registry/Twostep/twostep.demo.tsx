import React, { useRef, useState, useEffect } from 'react';

const LOGO_URL = 'https://i.postimg.cc/SKSNJ5SQ/White-Letter-S-Logo-Instagram-Post.png';

export default function TwoStepDemo() {
	const [code, setCode] = useState(['', '', '', '', '']);
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const [resending, setResending] = useState(false);
	const [error, setError] = useState('');
	const phoneNumber = '**********060';

	// Focus first input on mount
	useEffect(() => {
		inputRefs.current[0]?.focus();
	}, []);

	// Handle code completion
	useEffect(() => {
		const completeCode = code.join('');
		if (completeCode.length === 5 && !code.includes('')) {
			// Simulate code validation
			setTimeout(() => {
				if (completeCode === '12345') {
					setError('');
					alert('Code verified!');
				} else {
					setError('Invalid code. Please try again.');
					setCode(['', '', '', '', '']);
					inputRefs.current[0]?.focus();
				}
			}, 600);
		}
	}, [code]);

	// Handle input change
	const handleChange = (idx: number, val: string) => {
		if (!/^[0-9]?$/.test(val)) return;
		const newCode = [...code];
		newCode[idx] = val;
		setCode(newCode);
		if (val && idx < 4) {
			inputRefs.current[idx + 1]?.focus();
		}
	};

	// Handle backspace
	const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace' && !code[idx] && idx > 0) {
			inputRefs.current[idx - 1]?.focus();
		}
	};

	// Handle paste
	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		const pasted = e.clipboardData.getData('Text').replace(/\D/g, '').slice(0, 5);
		if (pasted.length) {
			setCode(pasted.split('').concat(Array(5 - pasted.length).fill('')));
			setTimeout(() => {
				inputRefs.current[Math.min(pasted.length, 4)]?.focus();
			}, 0);
		}
		e.preventDefault();
	};

	// Handle resend
	const handleResend = async () => {
		setResending(true);
		setTimeout(() => {
			setResending(false);
			setCode(['', '', '', '', '']);
			inputRefs.current[0]?.focus();
		}, 1200);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
			<div className="bg-white dark:bg-[#161B22] border border-gray-200 dark:border-gray-800 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md">
				{/* Mac-style window controls */}
				<div className="flex gap-2 mb-6">
					<span className="w-3 h-3 rounded-full bg-red-400" />
					<span className="w-3 h-3 rounded-full bg-yellow-300" />
					<span className="w-3 h-3 rounded-full bg-green-400" />
				</div>
				{/* Logo */}
				<div className="flex justify-center mb-6">
					<img
						src={LOGO_URL}
						alt="Logo"
						className="w-24 h-24 object-cover rounded-lg drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] bg-white dark:bg-[#0D1117]"
						onError={e => (e.currentTarget.src = '')}
					/>
				</div>
				{/* Phone number display */}
				<p className="text-gray-600 dark:text-gray-400 mb-6 text-sm text-center">
					We&apos;ve sent a 5 digit code to {phoneNumber}
				</p>
				{/* Input fields */}
				<form className="flex justify-center gap-3 mb-4" autoComplete="off" onSubmit={e => e.preventDefault()}>
					{code.map((digit, idx) => (
						<input
							key={idx}
							ref={el => (inputRefs.current[idx] = el)}
							type="text"
							inputMode="numeric"
							maxLength={1}
							className={
								'w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-semibold rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0D1117] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ' +
								(digit ? 'text-blue-500' : 'text-gray-400')
							}
							value={digit}
							onChange={e => handleChange(idx, e.target.value)}
							onKeyDown={e => handleKeyDown(idx, e)}
							onPaste={handlePaste}
							autoFocus={idx === 0}
							aria-label={`Digit ${idx + 1}`}
						/>
					))}
				</form>
				{/* Error message */}
				{error && <div className="text-red-500 text-xs text-center mb-3">{error}</div>}
				{/* Resend */}
				<div className="flex flex-col items-center">
					<button
						type="button"
						onClick={handleResend}
						disabled={resending}
						className="text-blue-500 hover:underline text-sm disabled:opacity-50 mb-2"
					>
						{resending ? 'Resending...' : "Didn't receive a code? Resend code"}
					</button>
				</div>
				{/* Instructions */}
				<div className="mt-6 text-xs text-gray-400 text-center">
					Enter the code you received to verify your identity.
				</div>
			</div>
		</div>
	);
}
