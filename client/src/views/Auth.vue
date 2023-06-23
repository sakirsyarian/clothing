<script>
export default {
    props: ["post"],
    emits: ["change"],
    data() {
        return {
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
            }
        },
        async postLogin() {
            try {
                const { data: user } = await this.post("login", {
                    email: this.login.email,
                    password: this.login.password,
                });

                localStorage.setItem("access_token", user.access_token);
                localStorage.setItem("name", user.data.username);
                localStorage.setItem("page", "Home");
                this.$emit("change", "Home");
            } catch (error) {
                console.log(error);
            }
        },
        async handleCredentialResponse(response) {
            try {
                const { data: user } = await this.post("google", null, {
                    google_token: response.credential,
                });

                localStorage.setItem("access_token", user.access_token);
                localStorage.setItem("name", user.data.username);
                localStorage.setItem("page", "Home");
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
                                <input
                                    v-model="register.email"
                                    type="email"
                                    name="email"
                                    class="input-form"
                                    placeholder="Enter email address ..."
                                    required
                                />
                            </div>
                            <div class="mb-6">
                                <label class="label-form">Password</label>
                                <input
                                    v-model="register.password"
                                    type="password"
                                    name="password"
                                    class="input-form"
                                    placeholder="Enter your password ..."
                                    required
                                />
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
                                <input
                                    v-model="login.email"
                                    type="email"
                                    id="email"
                                    class="input-form"
                                    placeholder="Enter email address ..."
                                    required
                                />
                            </div>
                            <div class="mb-6">
                                <label class="label-form">Password</label>
                                <input
                                    v-model="login.password"
                                    type="password"
                                    id="password"
                                    class="input-form"
                                    placeholder="Enter your password ..."
                                    required
                                />
                            </div>
                            <button type="submit" class="button-form">
                                Log In
                            </button>

                            <div class="text-center flex flex-col">
                                <p class="my-3 text-sm text-gray-400">or</p>
                                <div
                                    @click=""
                                    id="buttonDiv"
                                    class="mx-auto text-center"
                                ></div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
