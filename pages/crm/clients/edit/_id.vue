<template>
    <v-sheet class="about-content">
        <v-container grid-list-xl fluid class="grid-desk" v-if="editedUser">
            <v-flex lg8>
                <v-card class="profile-edit">
                    <div id="formInfo">
                        <v-card-title class="d-flex justify-space-between elevation-1">
                            <h4>Edit Client: <i>{{ editedUser.name }}</i></h4>
                            <v-btn @click="sendToAmoCrm()">send to amocrm</v-btn>
                            <v-icon @click="refresh">mdi-refresh</v-icon>
                        </v-card-title>
                    </div>
                </v-card>

                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <h5 class="mb-0" v-if="!editedUser.logged">User Info as guest:</h5>
                            <h5 class="mb-0" v-else>User Info:</h5>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-form class="row" ref="info" v-model="valid" lazy-validation>
                                <div class="col-md-4 col-12">
                                    <v-text-field
                                        label="Full name"
                                        v-model="editedUser.name"
                                        :rules="rules.nameRules"
                                        required
                                    ></v-text-field>
                                </div>
                                <div class="col-md-4 col-12">
                                    <v-text-field
                                        label="Email"
                                        type="email"
                                        v-model="editedUser.email"
                                        :rules="rules.emailRules"
                                        required
                                    ></v-text-field>
                                </div>
                                <div class="col-md-4 col-12">
                                    <v-text-field
                                        label="Phone"
                                        type="number"
                                        v-model="editedUser.phone"
                                        :rules="rules.phoneRules"
                                        required
                                    ></v-text-field>
                                </div>
                                <div class="col-md-2 col-12">
                                    <v-text-field
                                        label="Age"
                                        type="number"
                                        v-model="editedUser.age"
                                        required
                                    ></v-text-field>
                                </div>
                                <div class="col-md-4 col-12">
                                    <v-text-field
                                        label="Comments"
                                        v-model="editedUser.comments"
                                        required
                                    ></v-text-field>
                                </div>
                                <div class="col-md-3 col-12">
                                    <v-text-field
                                        label="Password"
                                        type="password"
                                        v-model="formData.password"
                                        :rules="rules.passwordRules"
                                    ></v-text-field>
                                </div>
                                <div class="col-md-3 col-12">
                                    <v-text-field
                                        label="Repeat Password"
                                        type="password"
                                        v-model="formData.confirmPassword"
                                        :rules="rules.confirmPasswordRules"
                                        required
                                    ></v-text-field>
                                </div>
                                <v-divider class="my-4"></v-divider>
                                <div class="col-md-12 col-12">
                                    <v-alert
                                        class="customize-alert"
                                        v-if="validateError"
                                        prominent
                                        type="error"
                                    >
                                        <v-row align="center">
                                            <v-col class="grow">
                                                {{ validateError }}
                                            </v-col>
                                            <v-col class="shrink">
                                                <v-icon @click="closeValidateErrors()">mdi-close</v-icon>
                                            </v-col>
                                        </v-row>
                                    </v-alert>
                                </div>
                                <v-card-title class="d-flex justify-center">
                                    <v-btn color="primary" large class="mt-3 mb-3" @click="submitUserInfo"
                                           v-if="editedUser.logged">
                                        Save
                                    </v-btn>
                                    <v-btn color="primary" large class="mt-3 mb-3" @click="submitUserInfo" v-else>
                                        Register
                                    </v-btn>
                                </v-card-title>
                            </v-form>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <h5 class="mb-0">Contacts:</h5>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-form class="row">
                                <div class="col-md-4 col-12">
                                    <v-text-field
                                        label="Address"
                                        v-model="userDetatils.address"
                                        required
                                    ></v-text-field>
                                </div>
                                <div class="col-md-3 col-12">
                                    <v-text-field
                                        label="City"
                                        v-model="userDetatils.city"
                                        required
                                    ></v-text-field>
                                </div>
                                <div class="col-md-3 col-12">
                                    <v-text-field
                                        label="Country"
                                        v-model="userDetatils.country"
                                        required
                                    ></v-text-field>
                                </div>
                                <div class="col-md-2 col-12">
                                    <v-text-field
                                        label="Postal Code"
                                        v-model="userDetatils.postalCode"
                                        required
                                    ></v-text-field>
                                </div>
                                <div class="col-md-4 col-12">
                                    <v-text-field
                                        label="Language"
                                        v-model="userDetatils.language"
                                        required
                                    ></v-text-field>
                                </div>
                                <div class="col-md-4 col-12">
                                    <v-text-field
                                        label="Currency"
                                        v-model="userDetatils.currency"
                                        required
                                    ></v-text-field>
                                </div>
                                <div class="col-md-4 col-12">
                                    <v-text-field
                                        label="Payment"
                                        v-model="userDetatils.payment"
                                        required
                                    ></v-text-field>
                                </div>
                            </v-form>
                            <v-form class="row">
                                <div class="col-md-3 col-12">
                                    <v-text-field
                                        label="Whatsapp"
                                        v-model="userDetatils.whatsapp"
                                        required
                                    ></v-text-field>
                                </div>
                                <div class="col-md-3 col-12">
                                    <v-text-field
                                        label="Messenger"
                                        v-model="userDetatils.messager"
                                        required
                                    ></v-text-field>
                                </div>

                                <div class="col-md-3 col-12">
                                    <v-text-field
                                        label="Viber"
                                        v-model="userDetatils.viber"
                                        required
                                    ></v-text-field>
                                </div>
                                <div class="col-md-3 col-12">
                                    <v-text-field
                                        label="Telegram"
                                        v-model="userDetatils.telegram"
                                        required
                                    ></v-text-field>
                                </div>
                                <div class="col-md-3 col-12">
                                    <v-text-field
                                        label="Facebook"
                                        v-model="userDetatils.facebook"
                                        required
                                    ></v-text-field>
                                </div>
                                <div class="col-md-3 col-12">
                                    <v-text-field
                                        label="Instagram"
                                        v-model="userDetatils.instagram"
                                        required
                                    ></v-text-field>
                                </div>
                                <div class="col-md-3 col-12">
                                    <v-text-field
                                        label="Other"
                                        v-model="userDetatils.other"
                                        required
                                    ></v-text-field>
                                </div>
                                <div class="col-md-3 col-12">
                                    <v-text-field
                                        label="Preferred communication channel"
                                        v-model="userDetatils.preferred"
                                        required
                                    ></v-text-field>
                                </div>
                                <v-btn color="primary" large class="mt-3 mb-3" @click="submitUserDetails">
                                    save
                                </v-btn>
                            </v-form>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <!-- <crmCart v-if="editedUser" :user="editedUser"/> -->
                    <crmOrders v-if="editedUser" :user="editedUser"/>

                </v-expansion-panels>
            </v-flex>
            <v-flex lg4>
                <v-card class="profile-edit">
                    <div id="formInfo">
                        <v-card-title class="d-flex justify-space-between elevation-1">
                            <h4>Client Info:</h4>
                        </v-card-title>
                        <v-card-text class="pt-0">
                            <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-title>Status:</v-list-item-title>
                                    <v-list-item-subtitle v-if="editedUser.logged">Auth</v-list-item-subtitle>
                                    <v-list-item-subtitle v-else>Guest</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-title>Lead:</v-list-item-title>
                                    <v-list-item-subtitle v-if="editedUser.lead">Yes</v-list-item-subtitle>
                                    <v-list-item-subtitle v-else>Guest</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-title>Cookies:</v-list-item-title>
                                    <v-list-item-subtitle v-for="(cookie, index) in editedUser.cookies" :key="index">
                                        {{ cookie }}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item two-line v-if="editedUser.logged">
                                <v-list-item-content>
                                    <v-list-item-title>Credentials:</v-list-item-title>
                                    <v-list-item-subtitle>
                                        email: <b>{{ editedUser.email }}</b>
                                    </v-list-item-subtitle>
                                    <v-list-item-subtitle>
                                        password: <b>{{ showPassword(editedUser.hash) }}</b>
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-title>Run time actions:</v-list-item-title>
                                    <v-list-item-title><small>Simmilar Cookies:</small></v-list-item-title>
                                    <v-list-item-subtitle v-for="(similarUser, index) in similarUsers" :key="index">
                                        <div v-if="similarUser.logged">
                                            <v-btn color="primary" small @click="loginAs(editedUser, similarUser)">
                                                Login
                                            </v-btn>
                                            <small>
                                                <nuxt-link :to="`/crm/clients/edit/${similarUser._id}`">
                                                    as {{ similarUser.name }} (<i>{{ similarUser.email }}</i>)
                                                </nuxt-link>
                                            </small>
                                        </div>
                                        <div v-else>
                                            Guest -
                                            <small>
                                                <nuxt-link :to="`/crm/clients/edit/${similarUser._id}`">
                                                    as {{ similarUser.name }}
                                                </nuxt-link>
                                            </small>
                                        </div>
                                    </v-list-item-subtitle>
                                    <v-btn @click="dialog = true">More Auth Users</v-btn>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card-text>
                    </div>
                </v-card>
            </v-flex>
            <v-snackbar
                v-model="snackbar"
                :multi-line="true"
                right
            >
                {{ snackbarText }}
                <template v-slot:action="{ attrs }">
                    <v-btn
                        color="red"
                        text
                        v-bind="attrs"
                        @click="snackbar = false"
                    >
                        Close
                    </v-btn>
                </template>
            </v-snackbar>

            <v-dialog v-model="dialog" max-width="700">
                <v-card>
                    <v-card-title class="headline">Auth Users:</v-card-title>
                    <v-card-text>
                        <v-card>
                            <v-card-title>
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Search"
                                    single-line
                                    hide-details
                                ></v-text-field>
                            </v-card-title>
                            <v-data-table
                                :headers="headers"
                                :items="authUsers"
                                :search="search"
                            >
                                <template v-slot:[`item`]="{ item, index }">
                                    <tr>
                                        <td> {{ item.name }}</td>
                                        <td>{{ item.email }}</td>
                                        <td>
                                            <v-btn color="primary" small @click="loginAs(editedUser, item)">Login
                                            </v-btn>
                                        </td>
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-card>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="green darken-1"
                            text
                            @click="dialog = false"
                        >
                            close
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </v-container>
    </v-sheet>
</template>

<script>

import {mapGetters, mapActions} from "vuex"
import crmApi from '@/api/crmApi'
import userApi from '@/api/userApi'
import crmOrders from '~/components/crm/ecommerce/crmOrders'
import crmCart from '~/components/crm/ecommerce/crmCart'

export default {
    components: {crmOrders, crmCart},
    layout: "crm",
    middleware: ['admin'],
    data: () => ({
        showContent: true,
        search: '',
        headers: [
            {
                text: 'Name',
                align: 'start',
                value: 'name',
            },
            {text: 'Email', value: 'email'},
            {text: 'Actions', value: 'actions'},
        ],
        validateError: false,
        dialog: false,
        registerDialog: false,
        editedUser: null,
        valid: true,
        snackbar: false,
        snackbarText: "",
        similarUsers: [],
        authUsers: {},
        userDetatils: {
            whatsapp: '',
            messager: '',
            viber: '',
            telegram: '',
            facebook: '',
            instagram: '',
            other: '',
            preferred: '',
            address: '',
            city: '',
            country: '',
            postalCode: '',
            language: '',
            currency: '',
            payment: '',
        },
        roles: [
            'client',
        ],
        formData: {
            login: '',
            password: '',
            confirmPassword: '',
        },
        rules: {
            loginRules: [
                v => !!v || 'Login is required',
                v => (v && v.length <= 10) || 'login must be less than 10 characters',
            ],
            nameRules: [v => !!v || 'Name is required'],
            emailRules: [v => !!v || 'Email is required'],
            phoneRules: [v => !!v || 'Phone is required'],
            passwordRules: [
                v => !!v || 'Password is required',
                v => (v && v.length >= 4) || 'Password must be more than 4 characters',
            ],
            confirmPasswordRules: [
                v => !!v || 'Type confirm password',
                v => (v && v.length >= 4) || 'Password must be more than 4 characters',
            ]
        }
    }),
    computed: mapGetters({
        authUser: 'authCRM/getUser',
        employees: 'admin/getEmployees',
        clients: 'admin/getClients',
    }),
    async mounted() {
        this.editedUser = await this.clients.find((client) => client._id === this.$route.params.id)
        if (Object.keys(this.editedUser).length === 0) {
            this.$router.push("/back/my-area")
        }
        await this.getDetails()
        await this.getSimilarUsers()
    },
    methods: {
        ...mapActions({
            editUser: 'admin/editUser',
            editClientAccount: 'admin/editClientAccount',
        }),
        async sendToAmoCrm() {
            const data = {
                name: this.editedUser.name,
                email: this.editedUser.email,
                phone: this.editedUser.phone,
                age: this.editedUser.age,
                comments: this.editedUser.comments,
                whatsapp: this.userDetatils.whatsapp,
                messenger: this.userDetatils.messenger,
                preferred: this.userDetatils.preferred,
            }


            await userApi.addLeadToAmoCrm(data, (response) => {
                this.snackbarText = `${this.editedUser.name} has been sent to AmmoCRM!`
            })
            console.log(data);
        },
        refresh() {
            this.$nuxt.$emit('refresh-crm-cart')
            this.$nuxt.$emit('refresh-crm-order')
        },
        async getDetails() {
            await crmApi.getUserDetails(this.editedUser._id, response => {
                if (response.user !== null) {
                    this.userDetatils = response.user
                }
            })
        },
        async loginAs(user, asUser) {
            const data = {
                to: user,
                toLoginUser: asUser
            }
            this.$socket.emit('remoteLogin', data, response => {
                this.snackbar = true
                this.snackbarText = `${user.name} was logged! as ${asUser.name}!`
                setTimeout(() => {
                    this.$router.push(`/crm/clients/edit/${asUser._id}`)
                }, 2000)
            })
        },
        async getSimilarUsers() {
            const data = {
                cookies: Object.values(this.editedUser.cookies),
                userId: this.editedUser._id,
            }
            await crmApi.getUsersByCookies(data, response => {
                this.similarUsers = response.similars
                this.authUsers = response.auths
            })
        },
        showPassword(password) {
            const pass = atob(this.editedUser.hash)
            return atob(password)
            return pass
        },
        async submitUserDetails() {
            this.userDetatils.userId = this.editedUser._id
            await crmApi.setUserDetails(this.userDetatils, response => {
                this.snackbar = true
                this.snackbarText = `${this.editedUser.name} details was saved!`
            })
        },
        submitUserInfo() {
            if (this.$refs.info.validate()) {
                this.validateEmail(this.editedUser)
                if (this.validateError === false) {
                    this.editedUser.logged = true
                    this.editedUser.password = this.formData.password
                    this.editUser(this.editedUser).then(() => {
                        this.getSimilarUsers()
                        this.snackbar = true
                        this.snackbarText = "The changes have been saved successfully!"
                        this.$socket.emit('refreshUsersData')
                    })
                }
            }
        },
        closeValidateErrors() {
            this.validateError = false
        },
        async validateEmail(user) {
            this.validateError = false
            await userApi.valadateEmail(user, response => {
                if(response) {
                    this.validateError = 'Email must be unique'
                }
            })
        },
        submitUserAccount() {
            if (this.$refs.account.validate()) {
                this.editedUser.password = this.formData.password
                this.editUser(this.editedUser).then(() => {
                    this.snackbar = true
                    this.snackbarText = "The changes have been saved successfully!"
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.display-1 {
    color: $custom_blue !important;
    font-weight: 700 !important;
}

.about-content {
    p {
        color: $custom_red !important
    }

    .banner {
        height: 70vh;
        position: relative;


        &__content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 3;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            padding: 0 30px;
            padding-top: 50px;
        }

        .v-card__title {
            text-align: left;
        }

        .v-card__text {
            text-align: left !important;
        }

        .v-btn {
            margin-left: 16px;
            max-width: 150px;
        }

        .v-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
        }

        &:after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background-color: rgba($color: $custom_blue, $alpha: 0.7);
            z-index: 2;
        }
    }

    .avatar-relative {
        position: relative;
        top: -80px;
        z-index: 4;
        max-width: 400px;
        min-width: 350px;
        margin-left: auto;
        margin-right: auto;
    }
}

.avatar-image {
    padding-top: 80px;

    .heading {
        font-size: 25px;
        color: $custom_blue;
        font-weight: bold;
    }

    .description button {
        text-decoration: underline;
    }

    .infoCust {
        .description {
            margin-top: 10px;
        }

        button {
            font-weight: normal;
            color: inherit;
        }
    }
}

.avatar-image .v-image {
    position: absolute;
    width: 160px;
    height: 160px;
    top: -79px;
    left: calc(50% - 80px);
    border-radius: 50% !important;
}

.avatar-image .edit {
    position: absolute;
    top: 30px;
    left: 200px
}

.v-expansion-panels {
    width: calc(100% - 20px);
}

.v-expansion-panel {
    margin-top: 20px;
}

@media (min-width: 991px) {
    .grid-desk {
        display: flex;
    }
    .profile-edit {
        order: 1;
        margin-right: 20px;
        position: relative;
        z-index: 2;

    }
    .avatar-relative {
        order: 2;
    }
}

.customize-alert {
    padding: 3px;

    .shrink {
        margin-right: 20px;
    }
}
</style>
