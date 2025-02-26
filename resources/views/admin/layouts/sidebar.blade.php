<aside class="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
        <div class="p-6">
            <a href="{{ route('admin.index') }}" class="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</a>
            <button class="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                <i class="fas fa-plus mr-3"></i> New Report
            </button>
        </div>
        <nav class="text-white text-base font-semibold pt-3">
            <a href="{{ route('admin.index') }}" class="flex items-center active-nav-link text-white py-4 pl-6 nav-item">
                <i class="fas fa-tachometer-alt mr-3"></i>
                Dashboard
            </a>
            <a href="{{ route('admin.colors.index') }}" class="flex items-center opacity-75 hover:opacity-100 text-white py-4 pl-6 nav-item">
                <i class="fas fa-palette mr-3"></i>
                Colors
            </a>
            <a href="{{ route('admin.sizes.index') }}" class="flex items-center opacity-75 hover:opacity-100 text-white py-4 pl-6 nav-item">
                <i class="fas fa-sitemap mr-2"></i>
                Sizes
            </a>
            <a href="{{ route('admin.coupon.index') }}" class="flex items-center opacity-75 hover:opacity-100 text-white py-4 pl-6 nav-item">
                <i class="fas fa-sitemap mr-2"></i>
                Coupons
            </a>
            <a href="{{ route('admin.product.index') }}" class="flex items-center opacity-75 hover:opacity-100 text-white py-4 pl-6 nav-item">
                <i class="fas fa-sitemap mr-2"></i>
                Products
            </a>
            <a href="{{ route('admin.orders.index') }}" class="flex items-center opacity-75 hover:opacity-100 text-white py-4 pl-6 nav-item">
                <i class="fas fa-sitemap mr-2"></i>
                Orders
            </a>
            <a href="{{ route('admin.reviews.index') }}" class="flex items-center opacity-75 hover:opacity-100 text-white py-4 pl-6 nav-item">
                <i class="fas fa-sitemap mr-2"></i>
                Reviews
            </a>
            <a href="{{ route('admin.users.index') }}" class="flex items-center opacity-75 hover:opacity-100 text-white py-4 pl-6 nav-item">
                <i class="fas fa-users mr-2"></i>
                Users
            </a>
            <hr>
            <a href="#" onClick="document.getElementById('AdminLogoutForm').submit()" class="flex items-center
             opacity-75 hover:opacity-100 text-white py-4 pl-6 nav-item mt-2">
                <i class="fas fa-tachometer-alt mr-3"></i>
                Sign out
            </a>
            <form id="AdminLogoutForm" action="{{ route('admin.logout') }}" method="POST">
                @csrf
            </form>


        </nav>
        <a href="#" class="absolute w-full upgrade-btn bottom-0 active-nav-link text-white flex items-center justify-center py-4">
            <i class="fas fa-arrow-circle-up mr-3"></i>
            Upgrade to Pro!
        </a>
    </aside>
