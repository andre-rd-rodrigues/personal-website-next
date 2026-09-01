---
title: '7 Website Privacy Checks for Small Businesses'
category: Technology
publishedDate: '2026-09-01'
description: 'Use this practical GDPR-focused website privacy checklist to review notices, cookies, forms, access, retention, security, and breach preparation.'
isTopPick: false
slug: data-privacy-rules-your-website-might-break
coverImage: /images/blog/data-privacy-rules-your-website-might-break.webp
---

If a website has a contact form, analytics, embedded media, or a checkout, it probably processes personal data. The important question is not whether the business feels “large enough” for privacy rules. It is what data the business processes, why it needs that data, and what risks the activity creates.

For businesses established in the EU—or processing personal data covered by EU rules—the GDPR applies according to the nature of the processing, not simply company size. Some obligations vary for smaller organisations, but “we are an SME” is not a general exemption. The [European Commission's SME guidance](https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/application-regulation/do-rules-apply-smes_en) explains those distinctions.

This checklist is a technical and operational starting point, not legal advice. Use it to find questions that need a privacy professional, not to replace one.

## 1. Make the Privacy Notice Match the Website

A privacy notice should describe what the website actually does—not what a template assumes it does.

For each form, analytics service, payment provider, embedded video, newsletter, and support tool, record:

- What personal data is collected.
- The purpose and legal basis for processing it.
- Who receives or processes it.
- How long it is retained.
- Whether it is transferred outside the relevant jurisdiction.
- How someone can exercise rights such as access or erasure.

The European Commission lists the [information organisations must provide when collecting personal data](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr/what-information-must-be-given-individuals-whose-data-collected_en). Keep the notice concise and understandable, then review it whenever a new third-party tool is added.

## 2. Do Not Load Optional Tracking Before the Required Choice

A banner that appears after analytics and advertising scripts have already run is not controlling anything.

Map every cookie and browser-storage item to its purpose. Keep strictly necessary functionality separate from optional analytics, personalisation, and advertising. Where consent is the applicable legal basis, do not load the optional category until the visitor has made the required choice, and make withdrawal as accessible as acceptance.

Embedded media and chat widgets can also set cookies or contact third parties. Test the page in a clean browser session rather than relying on the banner's settings screen.

## 3. Collect Only What the Task Requires

Every form field creates information that must be protected, retained, and eventually deleted.

If a contact form only needs a name, reply address, and message, do not ask for company size, telephone number, job title, or budget by habit. If a field is useful only occasionally, ask for it later when it becomes necessary.

This follows the GDPR principles of purpose limitation and data minimisation. The Commission's overview of [data-protection obligations](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/obligations_en) also explains protection by design and by default.

## 4. Secure the Full Data Path

HTTPS protects data while it travels between the browser and the website, but the path does not end there.

Review:

- Where form submissions are stored and emailed.
- Who can access the inbox, CRM, analytics, and website administration.
- Whether accounts use unique credentials and multi-factor authentication.
- Whether backups and exports contain the same personal data.
- How dependencies, plugins, and the hosting platform receive security updates.
- Whether logs contain messages, addresses, tokens, or other information they do not need.

Use role-based access and remove accounts that no longer require access. MFA is good baseline security for email, hosting, payment, and administration accounts.

PCI DSS has a more specific scope: Requirement 8.4.2 requires MFA for access into the cardholder data environment. It does not automatically make every business email inbox or hosting account part of that environment. The [PCI Security Standards Council clarification](https://www.pcisecuritystandards.org/faqs/why-do-requirements-8-3-9-and-8-3-10-1-focus-on-passwords-passphrases-used-for-single-factor-authentication-when-multi-factor-authentication-is-required-for-all-access-into-the-cde/) is the source to use when assessing PCI scope.

## 5. Give Every Data Type a Retention Rule

“Keep it forever in case we need it” is not a retention policy.

Define a period or review trigger for contact enquiries, customer accounts, invoices, support conversations, analytics identifiers, backups, and failed submissions. Legal, contractual, and operational needs may differ by category.

Deletion must cover the systems where copies exist, including exports and connected tools—not just the visible website database. Document exceptions where records must be retained for a legal reason.

## 6. Make Rights Requests Operational

A privacy notice can promise access, correction, or deletion, but someone still needs to fulfil the request.

Document:

1. Where requests arrive.
2. How identity is verified without collecting excessive new data.
3. Which systems must be searched.
4. Who reviews exceptions.
5. How the response and completion are recorded.

Run a test request internally. It will reveal data copied into inboxes, spreadsheets, marketing systems, and backups that the website documentation missed.

## 7. Prepare for a Breach Before It Happens

An incident plan does not need to be long. It needs to be usable.

Record who can secure the affected system, preserve evidence, assess the data and people involved, contact providers, obtain legal guidance, and decide whether regulatory or individual notification is required.

Keep provider contacts, system owners, and access-recovery procedures current. A plan stored only inside a compromised account is not a useful plan.

## A Practical Website Privacy Audit

Work through the website from the visitor's perspective:

- Open every form and record its fields, destination, and retention.
- Load the site in a clean browser and inspect what runs before consent.
- List every third party receiving visitor or customer data.
- Compare that list with the privacy notice and provider agreements.
- Review access to hosting, email, analytics, CRM, payments, and backups.
- Test one access or deletion request from beginning to end.
- Confirm who owns incident response and where the plan is stored.

The [European Data Protection Board's SME resources](https://www.edpb.europa.eu/sme-data-protection-guide/practical-resources-for-smes_en) provide additional checklists and material from European supervisory authorities.

## Frequently Asked Questions

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

If you want a technical review of what your website collects and where it sends it, [get in touch](https://www.andrerodrigo.com/contacts). I can map the implementation and identify where specialist legal guidance is still required.
