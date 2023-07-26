import { UserButton } from '@clerk/nextjs';

export default function Dashboard() {
  return (
    <div>
      <p>Dashboard (Protected)</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
