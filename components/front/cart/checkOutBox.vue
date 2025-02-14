<template>
    <v-form
        ref="formCheckOut"
        lazy-validation
        v-model="form.valid"
    >
        <v-row>
            <v-col class="col-md-12">
                <h4>User Info:</h4>
            </v-col>
            <v-col cols="12" md="4" sm="12" xs="12">
                <v-text-field
                    v-model="form.name"
                    :rules="form.rules.name"
                    label="Name"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12" xs="12">
                <v-text-field
                    v-model="form.email"
                    :rules="form.rules.email"
                    label="Email"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12" xs="12">
                <v-text-field
                    v-model="form.phone"
                    :rules="form.rules.phone"
                    label="Phone"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
                <h4>Contacts:</h4>
            </v-col>
            <v-col cols="12" md="4" sm="12" xs="12">
                <v-select
                    :rules="form.rules.country"
                    v-if="form.country"
                    :items="countries"
                    item-text="name"
                    item-value="name"
                    label="Country"
                    required
                    color="primary"
                    v-model="form.country"
                    >
                </v-select>
            </v-col>
            <v-col cols="12" md="4" sm="12" xs="12">
                <v-text-field
                    v-model="form.address"
                    :rules="form.rules.address"
                    label="Address"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12" xs="12">
                <v-text-field
                    v-model="form.city"
                    :rules="form.rules.city"
                    label="City"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="12" xs="12">
                <v-text-field
                    v-model="form.postalCode"
                    :rules="form.rules.postalCode"
                    label="Postal Code"
                ></v-text-field>
            </v-col>
        </v-row>

    </v-form>

</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import crmApi from '@/api/crmApi'

export default {
    data() {
        return {
            countrySelected: null,

            nextStep: false,
            form: {
                valid: false,
                name: this.$auth.loggedIn ? this.$auth.user.name : '',
                email: this.$auth.loggedIn ? this.$auth.user.email : '',
                phone: this.$auth.loggedIn ? this.$auth.user.phone : '',
                address: '',
                city: '',
                country: '',
                postalCode: '',
                rules: {
                    name: [v => !!v || 'Name is required'],
                    email: [
                        v => !!v || 'E-mail is required',
                        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                    ],
                    phone: [v => !!v || 'Phone is required'],
                    address: [v => !!v || 'Address is required'],
                    city: [v => !!v || 'City is required'],
                    country: [v => !!v || 'Country is required'],
                    postalCode: [v => !!v || 'Postal Code is required'],
                }
            }
        }
    },
    computed: mapGetters({
        cart: 'cart/getCart',
        order: 'cart/getOrder',
        user: 'chat/getUser',
        countries: 'getCountries',
        country: 'getCountry',
    }),
    mounted() {
        this.form.country = this.country.name

        if (this.$auth.loggedIn) {
            this.getOrderDetails()
        }

        this.$nuxt.$on('valiadateCheckoutForm', response => {
            this.validateForm(response)
        })
    },
    methods: {
        ...mapActions({
            removeCart: 'cart/removeCart',
            addCheckOutInfo: 'cart/addCheckOutInfo',
            updateCheckOutInfo: 'cart/updateCheckOutInfo',
        }),
        getOrderDetails() {
            if (!this.order) {
                crmApi.getUserDetails(this.$auth.user._id, response => {
                    if (response.user) {
                        this.form.address = response.user.address
                        this.form.city = response.user.city
                        this.form.country = response.user.country
                        this.form.postalCode = response.user.postalCode
                    }
                })
            } else {
                this.form.address = this.order.userDetails.address
                this.form.city = this.order.userDetails.city
                this.form.country = this.order.userDetails.country
                this.form.postalCode = this.order.userDetails.postalCode
            }
        },
        validateForm(response) {
            if (this.$refs.formCheckOut) {
                this.form.userId = this.user
                if (this.order) {
                    this.form.orderId = this.order._id
                    this.updateCheckOutInfo(this.form).then(res => {
                        this.nextStep = true
                        if (this.$refs.formCheckOut.validate() && this.nextStep) {
                            response.done()
                        }
                    })
                } else {
                    this.addCheckOutInfo(this.form).then(res => {
                        this.nextStep = true
                        if (this.$refs.formCheckOut.validate() && this.nextStep) {
                            response.done()
                        }
                    })
                }
            }
        }
    }
}
</script>

<style scoped>
.v-form {
    padding-left: 10px;
}

.col {
    flex-basis: 1 !important;
}

.v-form {
    width: 100%;
}
</style>
