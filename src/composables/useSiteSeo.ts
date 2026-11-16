import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { getSiteSeo } from '@/utils/site-seo'

export function useSiteSeo() {
  const route = useRoute()
  const { locale } = useI18n()

  useHead(() => {
    const page = getSiteSeo(route.path, locale.value === 'zh' ? 'zh' : 'en')
    return {
      title: page.title,
      htmlAttrs: { lang: page.lang },
      meta: [
        { name: 'description', content: page.description },
        { name: 'robots', content: page.robots },
        { property: 'og:title', content: page.title },
        { property: 'og:description', content: page.description },
        { property: 'og:url', content: page.canonical },
        { name: 'twitter:title', content: page.title },
        { name: 'twitter:description', content: page.description },
      ],
      link: [
        { rel: 'canonical', href: page.canonical },
        ...page.alternates.map((alternate) => ({ rel: 'alternate', ...alternate })),
      ],
    }
  })
}
