<template>
    <v-container v-if="products">
    	<v-row>
    		<v-col cols="12">
    			<h3 class="c-title title-olive mt-3">
    				{{ $trans('PagesNames', 'pageNameAllProducts') }}
    			</h3>
    		</v-col>
    		<v-col class="col-12">
    			<div class="category-container">
    				<v-row>
    					<v-col class="col-lg-3 col-6 mb-2" v-for="(product, key) in products" :key="key" v-if="product.main_image">
    						<nuxt-link :to="`/ro/categories/${product.category.alias}/${product.alias}`" class="product">
    							<v-img :src="`https://back.soledynft.shop/images/products/sm/${product.main_image.src}`"></v-img>
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
    			</div>
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

import { mapActions, mapGetters } from 'vuex'
import contentApi from '@/api/contentApi'
import Experts from '@/components/front/widgets/expertsWidget'

import FilterModal from '@/components/front/productWidgets/FilterModal.vue'
import SortModal from '@/components/front/productWidgets/SortModal.vue'

export default {
    components: {FilterModal, SortModal, Experts},
	async asyncData({ app, params, store }) {
		let prods = null
		await contentApi.getAllProducts({lang: store.state.lang.lang, currency: store.state.currency.id}, data => {
		    prods = data
		})
		return {
		    products: prods
		}
	},
    watch: {
        async currency() {
            await contentApi.getAllProducts({
                        lang: this.language.lang,
                        currency: this.currency.id
                    },
                    data => { this.products = data }
            )
        },
    },
	data() {
		return {
			category: null,
			filterModal: false,
			sortModal: false,
            products: null,
		}
	},
	computed: mapGetters({
		categories: 'getCategories',
        language: 'getLanguage',
		currency: 'getCurrency',
		trans: 'getTranslations',
	}),
	async mounted() {
        // this.products = this.category.products

        this.$nuxt.$on('replaceProducts', data => {
            this.products = data
        })

        this.$nuxt.$on('resetFilter', () => {
    		contentApi.getCategory({lang: this.language.lang, alias: this.category.alias, currency: this.currency.id}, data => {
    		    this.category = data
                this.products = this.category.products
    		})
        })

		// this.category = await this.categories.find((category) => category.alias == this.$route.params.slugCategory)
		// this.title = this.service.translation.seo_title
		// this.description = this.service.translation.seo_description
		// this.setChatBotmessage(this.trans.General.botMessageTemplate1 + " " + this.service.translation.bot_message + '? '+ this.trans.General.botMessageTemplate2)
	},
	methods: {
		openFilterModal() {
			this.filterModal = true
		},
		closeFilterModal() {
			this.filterModal = false
		},
		openSortModal() {
			this.sortModal = true
		},
		closeSortModal() {
			this.sortModal = false
		}
	}
}
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
   width: 100vw !important;
   max-width: 450px !important;
}

.category-container {
   position: relative;
}

.filter {
   display: flex;
   justify-content: space-around;
   padding: 20px 0;
   margin-bottom: 20px;
   background: $bcg-body;
   position: sticky;
   top: 56px;
   margin-left: -15px;
   margin-right: -15px;
   z-index: 4;
}

.product {
   &__name,
   &__price {
       display: block;
       font-family: $font-text;
       font-size: 14px;
       color: $olive-color;
       letter-spacing: 0;
       text-align: center;
       line-height: 1.2;
       margin-top: 10px;
       margin-bottom: 0;
   }
}

@media (min-width: 1200px) {
   .filter {
       top: 63px;
       justify-content: center;
       .v-btn {
           margin: 0 20px;
       }
   }
}
</style>
