type Props = {}

const Footer = (props: Props) => {
  return (
    <footer>
      <div className="py-6 px-4 border-t border-slate-700 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} TanStack Start. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
