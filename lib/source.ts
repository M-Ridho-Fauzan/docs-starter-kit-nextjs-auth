import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { loader } from 'fumadocs-core/source';
import { docs, meta } from '@/.source';

export const source = loader({
  baseUrl: '/docs',
  source: toFumadocsSource(docs, meta),
  i18n: {
    languages: ['en', 'id'],
    defaultLanguage: 'en',
    parser: 'dir',
    fallbackLanguage: 'en',
    hideLocale: 'never',
  },
});
