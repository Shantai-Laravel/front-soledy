<template>
    <v-container>
    	<v-row>
    		<v-col class="col-12">
    			<h3 class="c-title title-olive my-3">
    				New in
    			</h3>
    		</v-col>
    		<v-col class="col-lg-3 col-md-4 col-6 mb-2" v-for="(product, key) in products" :key="key" v-if="products">
    			<nuxt-link :to="`/ro/categories/${product.category.alias}/${product.alias}`" class="product">
        			<v-img :src="`${envAPI}/images/products/md/${product.main_image.src}`"></v-img>
        			<p class="product__name">{{ product.translation.name }}</p>
        			<div class="collectionOne__price price">
        				<span>{{ product.personal_price.price }}</span>
                        <span v-if="product.personal_price.old_price > product.personal_price.price">/</span>
                        <span class="price__discount" v-if="product.personal_price.old_price > product.personal_price.price">
                            {{ product.personal_price.old_price }}
                        </span>
        				<span>{{ currency.abbr }} </span>
        			</div>
    			</nuxt-link>
    		</v-col>
    	</v-row>
        <v-row class="experts">
            <v-col class="col-12">
                <h3 class="p-title-experts">{{ $trans('DetailsProductSet', 'viewLiveProducts') }}</h3>
            </v-col>
            <experts />
        </v-row>
    </v-container>
</template>

<script>

import contentApi from '@/api/contentApi'
import { mapActions, mapGetters } from 'vuex'
import Experts from '@/components/front/widgets/expertsWidget'

export default {
    components: {Experts},
    async asyncData({ app, params, store}) {
        let prods = null
        await contentApi.getNewProducts({
            lang: store.state.lang.lang,
            currency: store.state.currency.id,
        }, data => {
            prods = data
        })
        return {
            products: prods,
        }
    },
    watch: {
        async currency() {
            await contentApi.getNewProducts({
                lang: this.language.lang,
                currency: this.currency.id,
            }, data => {
                this.products = data
            })
        },
    },
    computed: mapGetters({
        language: 'getLanguage',
        currency: 'getCurrency',
        trans: 'getTranslations',
        envAPI: 'getEnvAPI',
    }),
    data () {
        return {
            products: null,
            items: {
                image: "https://back.soledynft.shop/images/products/og/bracelet-anne-poppy-forest-s1.JPG?5fa2a780ed00b",
                name: "Brăţară Anné-Poppy Forest",
                price: "170.00",
                to: "/one-product"
            }
        }
    }
}
</script>
<style media="screen">
    .product__name {
        text-align: center !important;
    }
</style>
