import { IoArrowBack } from 'react-icons/io5'
import { Link } from 'react-router-dom'

export const SubmissionSuccessMessage = () => {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-color--secondary-bg border border-color--border  p-8 rounded-lg'>
				<p className='text-center text-2xl text-white'>
					Please wait for up to 24 hours.
				</p>
				<Link to='/app'>
					<div className='flex items-center'>
						<IoArrowBack className='text-3xl text-sky-500' />
						<p className='text-sky-500 text-lg'>Back to Marketplace</p>
					</div>
				</Link>
			</div>
		</div>
	)
}
