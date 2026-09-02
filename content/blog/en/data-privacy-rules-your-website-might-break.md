---
title: '7 website privacy checks for small businesses'
category: Websites
publishedDate: '2026-09-01'
description: 'Use this practical GDPR-focused website privacy checklist to review notices, cookies, forms, access, retention, security, and breach preparation.'
isTopPick: false
slug: data-privacy-rules-your-website-might-break
coverImage: /images/blog/data-privacy-rules-your-website-might-break.webp
---

If a website has a contact form, analytics, embedded media, or a checkout, it probably processes personal data. Privacy obligations follow that data, not the size of the company behind it. What you collect, why you need it, and what could go wrong matter far more than headcount.

For businesses established in the EU, or processing personal data covered by EU rules, the GDPR applies according to the nature of the processing rather than company size. Being a smaller organisation reduces some duties, as the [European Commission's SME guidance](https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/application-regulation/do-rules-apply-smes_en) sets out, but it grants no blanket exemption from the core rules.

Treat this as a technical checklist for spotting issues to raise with a privacy professional, not as legal advice.

## 1. Make the privacy notice match the website

A privacy notice should describe what the website actually does—not what a template assumes it does.

For each form, analytics service, payment provider, embedded video, newsletter, and support tool, record:

- What personal data is collected.
- The purpose and legal basis for processing it.
- Who receives or processes it.
- How long it is retained.
- Whether it is transferred outside the relevant jurisdiction.
- How someone can exercise rights such as access or erasure.

The European Commission lists the [information organisations must provide when collecting personal data](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr/what-information-must-be-given-individuals-whose-data-collected_en). Keep the notice concise and understandable, then review it whenever a new third-party tool is added.

## 2. Do not load optional tracking before the required choice

A consent banner must load before the scripts it controls. If analytics and advertising fire first, consent changes nothing.

Map every cookie and browser-storage item to its purpose. Keep strictly necessary functionality separate from optional analytics, personalisation, and advertising. Where consent is the applicable legal basis, do not load the optional category until the visitor has made the required choice, and make withdrawal as accessible as acceptance.

Embedded media and chat widgets can also set cookies or contact third parties. Test the page in a clean browser session rather than relying on the banner's settings screen.

## 3. Collect only what the task requires

Every form field creates information that must be protected, retained, and eventually deleted.

If a contact form only needs a name, reply address, and message, do not ask for company size, telephone number, job title, or budget by habit. If a field is useful only occasionally, ask for it later when it becomes necessary.

This reflects the GDPR principles of purpose limitation and data minimisation, set out in the Commission's [data-protection obligations](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/obligations_en), which also cover protection by design and by default.

## 4. Secure the full data path

HTTPS protects data while it travels between the browser and the website, but the path does not end there.

Review:

- Where form submissions are stored and emailed.
- Who can access the inbox, CRM, analytics, and website administration.
- Whether accounts use unique credentials and multi-factor authentication.
- Whether backups and exports contain the same personal data.
- How dependencies, plugins, and the hosting platform receive security updates.
- Whether logs contain messages, addresses, tokens, or other information they do not need.

Use role-based access and remove accounts that no longer require access. MFA is good baseline security for email, hosting, payment, and administration accounts.

PCI DSS has a narrower scope: Requirement 8.4.2 mandates MFA for access into the cardholder data environment, as the [PCI Security Standards Council](https://www.pcisecuritystandards.org/faqs/why-do-requirements-8-3-9-and-8-3-10-1-focus-on-passwords-passphrases-used-for-single-factor-authentication-when-multi-factor-authentication-is-required-for-all-access-into-the-cde/) sets out. That requirement does not pull every business inbox or hosting account into scope.

## 5. Give every data type a retention rule

Storing data indefinitely just in case is a liability, not a policy. Give each type of data a defined lifespan.

Define a period or review trigger for contact enquiries, customer accounts, invoices, support conversations, analytics identifiers, backups, and failed submissions. Legal, contractual, and operational needs may differ by category.

Deletion must reach every copy, including exports, connected tools, and backups beyond the visible website database. Document exceptions where records must be retained for a legal reason.

## 6. Make rights requests operational

A privacy notice can promise access, correction, or deletion, but someone still needs to fulfil the request.

Document:

1. Where requests arrive.
2. How identity is verified without collecting excessive new data.
3. Which systems must be searched.
4. Who reviews exceptions.
5. How the response and completion are recorded.

Run a test request internally. It will reveal data copied into inboxes, spreadsheets, marketing systems, and backups that the website documentation missed.

## 7. Prepare for a breach before it happens

Keep the incident plan short enough to follow under pressure.

Record who can secure the affected system, preserve evidence, assess the data and people involved, contact providers, obtain legal guidance, and decide whether regulatory or individual notification is required.

Keep provider contacts, system owners, and access-recovery procedures current, and store them outside the systems they protect.

## A practical website privacy audit

Work through the website from the visitor's perspective:

- Open every form and record its fields, destination, and retention.
- Load the site in a clean browser and inspect what runs before consent.
- List every third party receiving visitor or customer data.
- Compare that list with the privacy notice and provider agreements.
- Review access to hosting, email, analytics, CRM, payments, and backups.
- Test one access or deletion request from beginning to end.
- Confirm who owns incident response and where the plan is stored.

The [European Data Protection Board's SME resources](https://www.edpb.europa.eu/sme-data-protection-guide/practical-resources-for-smes_en) provide additional checklists and material from European supervisory authorities.

## Frequently asked questions

### Does the GDPR apply to every small business?

It depends on the processing activities and territorial scope, not only employee count. Some record-keeping and data-protection-officer obligations have conditions or exemptions for smaller organisations, but core principles and individual rights can still apply.

### Does every website need a cookie banner?

Not necessarily. A site using only storage that is strictly necessary may not need the same consent interface as one using optional analytics or advertising. Audit what the site actually loads and obtain jurisdiction-specific advice.

### Is HTTPS enough to protect form data?

No. HTTPS protects data in transit. Access controls, storage, email, connected systems, logs, backups, retention, and incident handling still matter.

### Should a small business use MFA?

Yes, especially for email, hosting, administration, payments, and systems containing customer data. Treat that as sound security practice while assessing any specific PCI obligation according to the actual cardholder-data environment.

## Conclusion

Privacy compliance starts with understanding the data path: what the website collects, why, where it goes, who can access it, and when it is removed. A smaller data footprint, accurate notice, controlled tracking, limited access, and tested response processes reduce both compliance and security risk.

Unsure what your forms, analytics, or third-party widgets collect? [Send me your site](https://www.andrerodrigo.com/contacts). I can map the data flow and flag where specialist legal guidance is still needed.
