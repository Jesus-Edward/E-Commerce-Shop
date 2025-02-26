<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <meta name="author" content="David Grzyb">
    <meta name="description" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <!-- Tailwind -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.10.5/dist/sweetalert2.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css" rel="stylesheet" />

    <style>
        @import url('https://fonts.googleapis.com/css?family=Karla:400,700&display=swap');

        .font-family-karla {
            font-family: karla;
        }

        .bg-sidebar {
            background: #3d68ff;
        }

        .cta-btn {
            color: #3d68ff;
        }

        .upgrade-btn {
            background: #1947ee;
        }

        .upgrade-btn:hover {
            background: #0038fd;
        }

        .active-nav-link {
            background: #1947ee;
        }

        .nav-item:hover {
            background: #1947ee;
        }

        .account-link:hover {
            background: #3d68ff;
        }
    </style>
</head>

<body class="bg-gray-100 font-family-karla flex">

    @include('admin.layouts.sidebar')

    <div class="w-full flex flex-col h-screen overflow-y-hidden">

        @include('admin.layouts.header')

        <div class="w-full overflow-x-hidden border-t flex flex-col">
            <main class="w-full flex-grow p-6">
                <div class="flex justify-between items-center">

                    <h1 class="text-3xl text-black pb-6">@yield('title')</h1>

                    @yield('button')
                </div>

                @yield('contents')
            </main>

            @include('admin.layouts.footer')
        </div>

    </div>


    <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/simple-datatables@9.0.3"></script>
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>
    <!-- Font Awesome -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js"
        integrity="sha256-KzZiKy0DWYsnwMF+X1DvQngQ2/FxF7MF3Ff72XcpuPs=" crossorigin="anonymous"></script>
    <!-- ChartJS -->
    <script src="{{ asset('admin/assets/modules/jquery.min.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.10.5/dist/sweetalert2.all.min.js"></script>


    <script>
        if (document.getElementById("search-table") && typeof simpleDatatables.DataTable !== 'undefined') {
            const dataTable = new simpleDatatables.DataTable("#search-table", {
                searchable: true,
                sortable: false
            });
        }
    </script>

    @session('success')
        <script>
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '{{ session('success') }}',
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endsession

    <script>
        $(document).ready(function() {
            $('body').on('click', '.delete-item', function(e) {
                e.preventDefault();

                let url = $(this).attr('href');
                Swal.fire({
                    title: "Confirm Delete",
                    text: "Are you sure you want to delete this item?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            method: 'DELETE',
                            url: url,
                            data: {
                                _token: "{{ csrf_token() }}"
                            },
                            success: function(response) {
                                if (response.status === 'success') {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Item deleted successfully',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    // window.location.reload();
                                } else {
                                    if (response.status === 'error') {
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'error',
                                            title: 'Something went wrong!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                    }
                                }
                            },
                            error: function(error) {
                                console.error(error);
                            }
                        })
                    }
                })
            })
        })
    </script>

    <script>
        function readUrl(input, image) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById(image).classList.remove('hidden');
                    document.getElementById(image).setAttribute('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

        function handleImageUploadChange(input, image) {
            document.getElementById(input).addEventListener('change', function() {
                readUrl(this, image);
            });
        }

        handleImageUploadChange('thumbnail', 'thumbnail_preview');
        handleImageUploadChange('first_image', 'first_image_preview');
        handleImageUploadChange('second_image', 'second_image_preview');
        handleImageUploadChange('third_image', 'third_image_preview');
    </script>
    @stack('script')
</body>

</html>
