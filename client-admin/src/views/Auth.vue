<script>
export default {
    props: ["post"],
    emits: ["change"],
    data() {
        return {
            loading: false,
            register: {
                email: "",
                password: "",
            },
            login: {
                email: "admin@mail.com",
                password: "admin",
            },
        };
    },
    methods: {
        async postRegister() {
            try {
                await this.post("register", {
                    email: this.register.email,
                    password: this.register.password,
                });
            } catch (error) {
                console.log(error);

                const errorMessage = error.response.data.message
                errorMessage.map(err => {
                    this.$toast.error(err, { position: 'top-right' })
                })
            }
        },
        async postLogin() {
            try {
                this.loading = true
                const { data: user } = await this.post("login", {
                    email: this.login.email,
                    password: this.login.password,
                });

                localStorage.setItem("access_token", user.access_token);
                localStorage.setItem("name", user.data.username);

                this.$toast.success('Login successfully', { position: 'top-right' })
                this.$emit("change", "Home");
            } catch (error) {
                console.log(error);
                this.$toast.error(error.response.data.message, { position: 'top-right' })
            } finally {
                this.loading = false
            }
        },
        async handleCredentialResponse(response) {
            try {
                const { data: user } = await this.post("google", null, {
                    google_token: response.credential,
                });

                localStorage.setItem("access_token", user.access_token);
                localStorage.setItem("name", user.data.username);
                this.$emit("change", "Home");
            } catch (error) {
                console.log(error);
            }
        },
        renderButton() {
            google.accounts.id.initialize({
                client_id:
                    "72122631237-lknejvdtsjrildb7s32s208kr9g64dd0.apps.googleusercontent.com",
                callback: this.handleCredentialResponse,
            });

            google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" }
            );
        },
    },
    mounted() {
        this.renderButton();
    },
};
</script>

<template>
    <div class="col-span-5 border-t-2 border-gray-50">
        <div class="col-span-4 grid gap-12 padding-section">
            <section class="mx-auto mt-24">
                <div class="text-center">
                    <h2 class="font-bold text-4xl">Login Options</h2>
                    <p class="mt-5">
                        Log in and autocomplete your order with your personal
                        data, or sign up to enjoy all the benefits of an IDEA
                        account.
                    </p>
                </div>

                <div class="mt-10 grid grid-cols-2 divide-x-2">
                    <div class="px-14">
                        <h3 class="mb-3 font-semibold text-2xl">
                            Sign up and enjoy
                        </h3>
                        <p>
                            Sign up your data to make new account for access
                            this web apllication
                        </p>

                        <form class="mt-6" @submit.prevent="postRegister()">
                            <div class="mb-6">
                                <label class="label-form">Email</label>
                                <input v-model="register.email" type="email" name="email" class="input-form"
                                    placeholder="Enter email address ..." />
                            </div>
                            <div class="mb-6">
                                <label class="label-form">Password</label>
                                <input v-model="register.password" type="password" name="password" class="input-form"
                                    placeholder="Enter your password ..." />
                            </div>
                            <button type="submit" class="button-form">
                                Sign Up
                            </button>
                        </form>
                    </div>

                    <div class="px-14">
                        <h3 class="mb-3 font-semibold text-2xl">
                            Log in to your account
                        </h3>
                        <p>
                            Log in on your profile to autocomplete your purchase
                            order with your personal data.
                        </p>

                        <form class="mt-6" @submit.prevent="postLogin()">
                            <div class="mb-6">
                                <label class="label-form">Email</label>
                                <input v-model="login.email" type="email" id="email" class="input-form"
                                    placeholder="Enter email address ..." />
                            </div>
                            <div class="mb-8">
                                <label class="label-form">Password</label>
                                <input v-model="login.password" type="password" id="password" class="input-form"
                                    placeholder="Enter your password ..." />
                            </div>
                            <button type="submit" class="flex justify-center items-center button-form">
                                Log In
                                <div v-if="loading" role="status">
                                    <svg aria-hidden="true"
                                        class="w-6 h-6 ml-3 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor" />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill" />
                                    </svg>
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </button>

                            <div class="text-center flex flex-col">
                                <p class="my-3 text-sm text-gray-400">or</p>
                                <div @click="" id="buttonDiv" class="mx-auto text-center"></div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
