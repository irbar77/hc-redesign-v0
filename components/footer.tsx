import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                HC
              </div>
              <span className="text-xl font-semibold">
                hczip<span className="text-primary">.com</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-background/70 leading-relaxed">
              The home care marketplace connecting caregivers, agencies, and families.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Caregivers</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  Career Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Agencies</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  List Agency
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  Post Jobs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  Find Caregivers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 text-center text-sm text-background/50">
          <p>&copy; {new Date().getFullYear()} hczip.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
