<template>
    <section class="container h-screen justify-center items-center">
        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
            <form class="space-y-6" action="#">
                <h5 class="text-xl font-medium text-gray-900">Sign in to our platform</h5>
                <div>
                    <label for="email" class="form-label">Your
                        email</label>
                    <input type="email" name="email" id="email" class="form-input" placeholder="name@company.com" required>
                </div>
                <div>
                    <label for="password" class="form-label">Your
                        password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" class="form-input" required>
                </div>
                <div class="flex items-start">
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input id="remember" type="checkbox" value=""
                                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                                required>
                        </div>
                        <label for="remember" class="ml-2 text-sm font-medium text-gray-900">Remember
                            me</label>
                    </div>
                    <a href="#" class="ml-auto text-sm text-blue-700 hover:underline">Lost Password?</a>
                </div>
                <button type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login
                    to your account</button>
                <div class="text-sm font-medium text-gray-500">
                    Not registered?
                    <router-link to="/signup" class="text-blue-700 hover:underline">
                        Create account
                    </router-link>
                </div>
            </form>
        </div>

    </section>
</template>