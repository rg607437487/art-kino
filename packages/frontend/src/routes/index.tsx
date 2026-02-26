import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
	component: Index,
})

function Index() {
	return (
		<>
			<h2 className="p-2">Welcome stranger!</h2>
			<div className="p-2">Nothing to see here but thank you for your visit!</div>
		</>
	)
}
