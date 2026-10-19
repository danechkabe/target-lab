# Джерела наочних матеріалів

Перевірено й отримано: **2026-10-19**. Офіційні зображення збережено локально без редагування вмісту. Дата отримання не є датою створення оригінального скріншота. Інтерфейси можуть відрізнятися.

## Справжні зображення з публічних джерел

| Локальний файл | Що саме показано | Сторінка джерела | Точна URL зображення / спосіб отримання |
|---|---|---|---|
| `assets/guides/ga4-debug-1.png` | Google tag: Configuration settings, debug_mode=true. Не показує налаштовану подію ліда. | https://support.google.com/analytics/answer/7201382?hl=en | https://lh3.googleusercontent.com/hsQDaLcsObHhpOMEhYweWlcHVuc5hJJbw_xpaGXrmZzLPkMbaqW0kUyT5OhDpHLuaho=w1600 |
| `assets/guides/ga4-debug-2.png` | GA4 DebugView: часовий потік подій. На оригіналі є © 2023 Google, це не кадр нового інтерфейсу 2026 року. | https://support.google.com/analytics/answer/7201382?hl=en | https://lh3.googleusercontent.com/WRVPfQBuseZDOlb16woQWXj3VcnNVhH1b_gvw07A3bQUwBAX6TaAD1ISoTGk0xNJWpk=w1600 |
| `assets/guides/gtm-preview-1.png` | Tag Assistant: меню Share сеансу налагодження. Не показує спрацювання тегів. | https://support.google.com/tagmanager/answer/6107056?hl=en | https://lh3.googleusercontent.com/B5I_C3f3zImE-zIBypIYlsdfyAmrS0KyzgepSDViBP4KTlLJhBLpNIEXB9Jcj9LVwg=w1600 |
| `assets/guides/utm-doc.png` | Справжній знімок публічної довідки, не скріншот рекламного кабінету. | https://support.google.com/analytics/answer/10917952?hl=en | Окремої URL оригінального зображення немає: локальний capture цієї точної сторінки через Playwright + Google Chrome, viewport 1280×1000, 2026-10-19, без входу. |
| `assets/guides/google-conversions-doc.png` | Справжній знімок публічної довідки, не скріншот рекламного кабінету. | https://support.google.com/google-ads/answer/12216226?hl=en | Окремої URL оригінального зображення немає: локальний capture цієї точної сторінки через Playwright + Google Chrome, viewport 1280×1000, 2026-10-19, без входу. |

Знімки документації зроблено чистим headless-сеансом `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. Облікові записи, cookies користувача, приватні дані й платні сервіси не використовувалися. Вміст сторінки не підмінювався. Для Google-hosted оригіналів застосовано URL-параметр `=w1600`, щоб отримати читабельний розмір. Посилання ведуть на публічні джерела, авторство Google не привласнюється. Відкрита доступність не є окремою ліцензією, тож при іншому використанні перевір умови правовласника.

## Навчальні схеми

Усі SVG створені для цього курсу. Кожна містить видимий напис **«Навчальна схема, не скріншот інтерфейсу»**, title та desc для доступності. Це не відтворення реального кабінету.

- `business-events.svg`: підтверджена бізнес-дія → GA4 / CRM → статус продажів.
- `tracking-plan.svg`: подія, момент спрацювання, джерело, відповідальний і перевірка.
- `utm-anatomy.svg`: структура URL, source, medium, campaign, content.
- `meta-hierarchy.svg`: кампанія → група → оголошення, без імітації Ads Manager.
- `crm-flow.svg`: приклад статусів, відповідальний і наступна дія.

## Першоджерела інструкцій

- GA4 DebugView: https://support.google.com/analytics/answer/7201382?hl=en
- GTM Preview: https://support.google.com/tagmanager/answer/6107056?hl=en
- Рекомендовані GA4 events, зокрема generate_lead: https://support.google.com/analytics/answer/9267735?hl=en
- UTM: https://support.google.com/analytics/answer/10917952?hl=en
- Google Ads web conversions: https://support.google.com/google-ads/answer/12216226?hl=en
- Google Search setup: https://support.google.com/google-ads/answer/9510373?hl=en
- Meta hierarchy: https://www.facebook.com/business/help/706063442820839

Meta повернула публічний заголовок документа, але не доступний повний текст або зображення. Справжній скріншот Meta не отримано й не вигадано. Послідовність Meta у курсі є навчальною схемою, а назви та доступність полів слід звірити у власному дозволеному акаунті. CRM-схема є прикладом робочого процесу, а не офіційною документацією конкретної CRM.

## Інтеграція

`visual-guides.js` визначає `const VISUAL_GUIDES`. Ключі: 7, 8, 9, 10, 11, 14, 21, 25, 27, 29. Це 0-based ID уроків 8, 9, 10, 11, 12, 15, 22, 26, 28, 30. Значення є готовими HTML-рядками з фігурами, нумерованими кроками та першоджерелами. Підключити як звичайний script перед renderer-скриптом, додати `VISUAL_GUIDES[lessonId] || ""` до вмісту уроку. Власний CSS не обовʼязковий: зображення адаптуються до ширини контейнера. Натискання відкриває повнорозмірний локальний файл.

## Контроль цілісності файлів

| Файл | Розмір PNG / формат SVG | SHA-256 |
|---|---|---|
| `business-events.svg` | SVG 1100×700 | `a0261173edd66fdde729bdff7aeb3ad85fc3bbc33c5e6a5d9ebd403450d97a4f` |
| `crm-flow.svg` | SVG 1100×700 | `2b1bc5e459a687170b06664d710d8f737326e979f3279714a125b9acad2c1bf5` |
| `ga4-debug-1.png` | PNG 1454×1316 | `605f8655103c25f37c62b8d85748fd50290fed2d2e6d4c88992e29104b5f9fac` |
| `ga4-debug-2.png` | PNG 1600×876 | `48f3f2e799de15e89861d29a886cc28167681eca36e4e5c3c9fc812ad29b4d4c` |
| `google-conversions-doc.png` | PNG 1280×1000 | `56e26ba6154e93fbd5b1b1c43f2f435238b90fbaff52c37248c65e5b06a1f49d` |
| `gtm-preview-1.png` | PNG 1184×338 | `5ee22e2d21113aa7b0acad004e963a0dd1d806d312f2b56bca61a862a7634385` |
| `meta-hierarchy.svg` | SVG 1100×700 | `718854fe2a118d0dd689b1d0c29148f2309878af54b18a8fb57897d66589c564` |
| `tracking-plan.svg` | SVG 1100×700 | `2ac1029b45c953a4cc01ec2a4fdc492e284bfe240b698dd061773e9c05f17420` |
| `utm-anatomy.svg` | SVG 1100×700 | `b417adbd16255e725eb3e458266d1912129d2ca51bf825f3193214c1e965d276` |
| `utm-doc.png` | PNG 1280×1000 | `6d12cc84fb19e18b588e761c47ef6e76a3d2f279eb7cd95cf5a03d499f25cc6b` |
