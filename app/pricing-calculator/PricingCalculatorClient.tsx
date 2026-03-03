"use client";

import { useMemo, useState } from "react";

type Locale = "zh" | "en" | "fr" | "de";

type Labels = {
  title: string;
  desc: string;
  oneTimeTitle: string;
  oneTimeDesc: string;
  existingSite: string;
  yes: string;
  no: string;
  contract: string;
  concurrentUsers: string;
  dailyOrders: string;
  monthly: string;
  annual: string;
  note: string;
  custom: string;
  includes: string;
  contactTitle: string;
  email: string;
  phone: string;
  phoneHours: string;
  whatsapp: string;
  processTitle: string;
  processDesc: string;
};

const PHONE_DISPLAY = "+41 78 249 59 83";
const PHONE_DIAL = "+41782495983";
const EMAIL = "order.links.26@gmail.com";
const WHATSAPP_LINK = "https://wa.me/41782495983";
const SETUP_FEE = 500;
const BASE_MONTHLY = 89;

function resolveConcurrentTier(count: number) {
  if (count <= 50) {
    return { custom: false, surcharge1: 6, surcharge3: 0 };
  }
  if (count <= 100) {
    return { custom: false, surcharge1: 26, surcharge3: 16 };
  }
  if (count <= 150) {
    return { custom: false, surcharge1: 70, surcharge3: 46 };
  }
  if (count <= 200) {
    return { custom: false, surcharge1: 146, surcharge3: 100 };
  }
  return { custom: true, surcharge1: 0, surcharge3: 0 };
}

function resolveDailyOrderTier(count: number) {
  if (count <= 100) {
    return { custom: false, surcharge: 0 };
  }
  if (count <= 200) {
    return { custom: false, surcharge: 5 };
  }
  if (count <= 300) {
    return { custom: false, surcharge: 10 };
  }
  if (count <= 400) {
    return { custom: false, surcharge: 15 };
  }
  if (count <= 500) {
    return { custom: false, surcharge: 20 };
  }
  if (count <= 600) {
    return { custom: false, surcharge: 25 };
  }
  if (count <= 700) {
    return { custom: false, surcharge: 30 };
  }
  return { custom: true, surcharge: 0 };
}

const TEXT: Record<Locale, Labels> = {
  zh: {
    title: "价格计算器",
    desc: "根据客流与订单规模估算月费。",
    oneTimeTitle: "一次性首页定制费用",
    oneTimeDesc: "500 CHF。已包含维护费用，不包含域名费用。",
    existingSite: "您是否已经拥有餐厅网站？（如果拥有可商议部分折扣）",
    yes: "有",
    no: "没有",
    contract: "合同年限",
    concurrentUsers: "最多同时在线点餐人数",
    dailyOrders: "每日订单数量",
    monthly: "预估月费",
    annual: "预估年费",
    note: "一次性费用和月费均包含维护，不包含域名。",
    custom: "该组合需要沟通报价",
    includes: "维护费用已包含，域名费用不包含。",
    contactTitle: "联系渠道",
    email: "邮箱",
    phone: "电话",
    phoneHours: "电话接通时间：工作日 18:00-21:00，周末 10:00-22:00",
    whatsapp: "WhatsApp",
    processTitle: "上线流程与支付说明",
    processDesc:
      "请将以上选项信息与餐厅资料（名字、地址、电话号码、邮箱、域名、简短描述、餐厅图片及描述）发送给我们，我们会先与您确认实施方案与上线排期。方案确认后，支付 200 CHF 作为项目确认金；通常 5-10 天可完成上线。网站正式交付后，再支付剩余 300 CHF，月费从交付日期开始计算。",
  },
  en: {
    title: "Pricing Calculator",
    desc: "Estimate monthly fee by traffic and daily order volume. Out-of-range tiers require direct discussion.",
    oneTimeTitle: "One-time homepage customization fee",
    oneTimeDesc: "500 CHF. Maintenance included. Domain cost excluded.",
    existingSite: "Do you already have a restaurant website? (Partial discount may apply)",
    yes: "Yes",
    no: "No",
    contract: "Contract term",
    concurrentUsers: "Max concurrent online ordering users",
    dailyOrders: "Daily order count",
    monthly: "Estimated monthly fee",
    annual: "Estimated yearly fee",
    note: "One-time and monthly fees include maintenance; domain is excluded.",
    custom: "This combination requires custom quote",
    includes: "Maintenance is included; domain registration is excluded.",
    contactTitle: "Contact",
    email: "Email",
    phone: "Phone",
    phoneHours: "Phone support hours: Weekdays 18:00-21:00, Weekends 10:00-22:00",
    whatsapp: "WhatsApp (with selected options)",
    processTitle: "Launch process and payment notes",
    processDesc:
      "Please send us your selected options together with restaurant details (name, address, phone number, email, domain, short description, and restaurant images with captions). We will first confirm the implementation plan and launch schedule with you. Once the plan is confirmed, a 200 CHF project deposit can be arranged. Launch is usually completed within 5-10 days. After final delivery, the remaining 300 CHF is settled, and the monthly fee starts from the delivery date.",
  },
  fr: {
    title: "Calculateur de prix",
    desc: "Estimation du prix mensuel selon le trafic et les commandes. Hors tranche : devis sur discussion.",
    oneTimeTitle: "Frais uniques de personnalisation de la page d’accueil",
    oneTimeDesc: "500 CHF. Maintenance incluse. Domaine non inclus.",
    existingSite: "Avez-vous déjà un site de restaurant ? (Remise partielle possible)",
    yes: "Oui",
    no: "Non",
    contract: "Durée du contrat",
    concurrentUsers: "Nombre max d'utilisateurs de commande en ligne simultanés",
    dailyOrders: "Nombre de commandes par jour",
    monthly: "Frais mensuels estimés",
    annual: "Frais annuels estimés",
    note: "Les frais uniques et mensuels incluent la maintenance; le domaine est exclu.",
    custom: "Cette combinaison demande un devis personnalisé",
    includes: "Maintenance incluse ; coût du domaine exclu.",
    contactTitle: "Contact",
    email: "E-mail",
    phone: "Téléphone",
    phoneHours: "Disponibilité : jours ouvrables 18:00-21:00, week-end 10:00-22:00",
    whatsapp: "WhatsApp (avec options sélectionnées)",
    processTitle: "Mise en ligne et modalités de paiement",
    processDesc:
      "Merci de nous envoyer les options sélectionnées ainsi que les informations du restaurant (nom, adresse, téléphone, e-mail, domaine, courte description, images du restaurant et leurs descriptions). Nous confirmerons d'abord avec vous le plan de mise en oeuvre et le planning de mise en ligne. Une fois le plan validé, un acompte de confirmation de 200 CHF pourra etre regle. La mise en ligne est generalement finalisee sous 5-10 jours. Apres la livraison officielle du site, le solde de 300 CHF est regle, puis l'abonnement mensuel demarre a partir de la date de livraison.",
  },
  de: {
    title: "Preisrechner",
    desc: "Monatspreis nach Traffic und Bestellvolumen schätzen. Außerhalb der Stufen: individuelle Absprache.",
    oneTimeTitle: "Einmalige Kosten für Startseiten-Anpassung",
    oneTimeDesc: "500 CHF. Wartung enthalten. Domain nicht enthalten.",
    existingSite: "Haben Sie bereits eine Restaurant-Website? (Teilrabatt möglich)",
    yes: "Ja",
    no: "Nein",
    contract: "Vertragslaufzeit",
    concurrentUsers: "Maximal gleichzeitige Online-Besteller",
    dailyOrders: "Tägliche Bestellungen",
    monthly: "Geschätzte Monatsgebühr",
    annual: "Geschätzte Jahresgebühr",
    note: "Einmalige und monatliche Kosten enthalten Wartung; Domain ist nicht enthalten.",
    custom: "Diese Kombination erfordert ein individuelles Angebot",
    includes: "Wartung ist enthalten; Domainkosten sind ausgeschlossen.",
    contactTitle: "Kontakt",
    email: "E-Mail",
    phone: "Telefon",
    phoneHours: "Telefonzeiten: Werktage 18:00-21:00, Wochenende 10:00-22:00",
    whatsapp: "WhatsApp (mit ausgewählten Optionen)",
    processTitle: "Go-live Ablauf und Zahlungsinfo",
    processDesc:
      "Bitte senden Sie uns die ausgewaehlten Optionen zusammen mit den Restaurantdaten (Name, Adresse, Telefonnummer, E-Mail, Domain, kurze Beschreibung sowie Restaurantbilder mit Beschreibung). Wir stimmen zunaechst gemeinsam mit Ihnen den Umsetzungsplan und den Go-live Zeitplan ab. Nach Bestaetigung des Plans kann eine Projektanzahlung von 200 CHF geleistet werden. Der Go-live ist in der Regel innerhalb von 5-10 Tagen abgeschlossen. Nach der finalen Uebergabe werden die restlichen 300 CHF beglichen; die monatliche Gebuehr beginnt ab dem Lieferdatum.",
  },
};

export function PricingCalculatorClient({ locale }: { locale: Locale }) {
  const labels = TEXT[locale];
  const [hasSite, setHasSite] = useState<"yes" | "no">("no");
  const [contractYears, setContractYears] = useState<1 | 3>(1);
  const [concurrentInput, setConcurrentInput] = useState("50");
  const [dailyInput, setDailyInput] = useState("100");

  const result = useMemo(() => {
    const concurrentCount = Number.parseInt(concurrentInput, 10);
    const dailyCount = Number.parseInt(dailyInput, 10);

    if (
      Number.isNaN(concurrentCount) ||
      Number.isNaN(dailyCount) ||
      concurrentCount <= 0 ||
      dailyCount <= 0
    ) {
      return {
        isCustom: true,
        monthly: null as number | null,
        annual: null as number | null,
        concurrentCount: 0,
        dailyCount: 0,
      };
    }

    const concurrent = resolveConcurrentTier(concurrentCount);
    const daily = resolveDailyOrderTier(dailyCount);

    if (concurrent.custom || daily.custom) {
      return {
        isCustom: true,
        monthly: null as number | null,
        annual: null as number | null,
        concurrentCount,
        dailyCount,
      };
    }
    const concurrentSurcharge = contractYears === 1 ? concurrent.surcharge1 : concurrent.surcharge3;
    const monthly = BASE_MONTHLY + concurrentSurcharge + daily.surcharge;
    return {
      isCustom: false,
      monthly,
      annual: monthly * 12,
      concurrentCount,
      dailyCount,
    };
  }, [concurrentInput, contractYears, dailyInput]);

  const summaryLines = [
    `Language: ${locale.toUpperCase()}`,
    `Has existing website: ${hasSite === "yes" ? "Yes" : "No"}`,
    `Contract years: ${contractYears}`,
    `Concurrent users: ${result.concurrentCount || "-"}`,
    `Daily orders: ${result.dailyCount || "-"}`,
  ];

  const emailHref = `mailto:${EMAIL}?subject=${encodeURIComponent("OrderLinks Inquiry")}&body=${encodeURIComponent(summaryLines.join("\n"))}`;
  const whatsappHref = `${WHATSAPP_LINK}?text=${encodeURIComponent(summaryLines.join("\n"))}`;

  return (
    <main className="mx-auto mt-10 max-w-7xl space-y-8 text-[#171717]">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="display-title text-3xl font-semibold tracking-tight sm:text-4xl">{labels.title}</h1>
          <p className="mt-3 text-[#2d2d2d]">{labels.desc}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="mb-3 block text-sm font-medium text-[#1f1f1f]">{labels.existingSite}</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`calc-chip ${hasSite === "yes" ? "calc-chip-active" : ""}`}
                  onClick={() => setHasSite("yes")}
                >
                  {labels.yes}
                </button>
                <button
                  type="button"
                  className={`calc-chip ${hasSite === "no" ? "calc-chip-active" : ""}`}
                  onClick={() => setHasSite("no")}
                >
                  {labels.no}
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="contract" className="mb-3 block text-sm font-medium text-[#1f1f1f]">
                {labels.contract}
              </label>
              <select
                id="contract"
                className="calc-select"
                value={contractYears}
                onChange={(event) => setContractYears(Number(event.target.value) as 1 | 3)}
              >
                <option value={1}>1 year</option>
                <option value={3}>3 years</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="concurrent" className="mb-3 block text-sm font-medium text-[#1f1f1f]">
                {labels.concurrentUsers}
              </label>
              <input
                id="concurrent"
                className="calc-select"
                type="number"
                inputMode="numeric"
                min={1}
                step={1}
                value={concurrentInput}
                onChange={(event) => setConcurrentInput(event.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="daily" className="mb-3 block text-sm font-medium text-[#1f1f1f]">
                {labels.dailyOrders}
              </label>
              <input
                id="daily"
                className="calc-select"
                type="number"
                inputMode="numeric"
                min={1}
                step={1}
                value={dailyInput}
                onChange={(event) => setDailyInput(event.target.value)}
              />
            </div>
          </div>
        </article>

        <aside className="feature-card rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-[#3d3d3d]">{labels.oneTimeTitle}</p>
          <p className="mt-2 text-3xl font-semibold">{SETUP_FEE} CHF</p>
          <p className="mt-2 text-sm text-[#2d2d2d]">{labels.oneTimeDesc}</p>

          <div className="mt-5 space-y-2 rounded-xl border border-black/10 bg-[#fafafa] p-4">
            <p className="text-sm font-medium text-[#3d3d3d]">{labels.monthly}</p>
            <p className="text-3xl font-semibold">
              {result.isCustom ? labels.custom : `${result.monthly} CHF`}
            </p>
            <p className="text-sm text-[#4a4a4a]">
              {result.isCustom ? labels.custom : `${labels.annual}: ${result.annual} CHF`}
            </p>
          </div>

          {hasSite === "yes" ? (
            <p className="mt-2 text-xs text-[#2d2d2d]">已有网站可沟通直接接入折扣。</p>
          ) : null}
        </aside>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="section-title text-2xl font-semibold">{labels.contactTitle}</h2>
        <p className="mt-2 text-sm text-[#4a4a4a]">{labels.note}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <a
            className="group rounded-xl border border-[#121212]/15 bg-[#121212]/3 p-4 transition hover:-translate-y-0.5 hover:border-[#121212]/35 hover:bg-[#121212]/6"
            href={emailHref}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#121212] text-white">
                <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-none stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3.75 7.5 12 13.25 20.25 7.5" />
                  <rect x="3.75" y="5.25" width="16.5" height="13.5" rx="2.25" strokeWidth="1.8" />
                </svg>
              </span>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#121212]/70">{labels.email}</p>
            </div>
            <p className="mt-2 break-all text-sm font-semibold text-[#121212] underline-offset-4 group-hover:underline">
              {EMAIL}
            </p>
          </a>
          <a
            className="group rounded-xl border border-[#121212]/15 bg-[#121212]/3 p-4 transition hover:-translate-y-0.5 hover:border-[#121212]/35 hover:bg-[#121212]/6"
            href={`tel:${PHONE_DIAL}`}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#121212] text-white">
                <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-none stroke-current">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M4.8 6.2a2 2 0 0 1 2.08-1.1l2.2.44a2 2 0 0 1 1.6 1.58l.27 1.34a2 2 0 0 1-.58 1.86l-1.06 1.06a14.2 14.2 0 0 0 4.3 4.3l1.06-1.06a2 2 0 0 1 1.86-.58l1.34.27a2 2 0 0 1 1.58 1.6l.44 2.2a2 2 0 0 1-1.1 2.08l-1.19.6c-.78.39-1.67.44-2.48.13a19.2 19.2 0 0 1-11.9-11.9 2.9 2.9 0 0 1 .13-2.48l.6-1.19Z"
                  />
                </svg>
              </span>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#121212]/70">{labels.phone}</p>
            </div>
            <p className="mt-2 text-sm font-semibold text-[#121212] underline-offset-4 group-hover:underline">
              {PHONE_DISPLAY}
            </p>
          </a>
          <a
            className="group rounded-xl border border-[#121212]/15 bg-[#121212]/3 p-4 transition hover:-translate-y-0.5 hover:border-[#121212]/35 hover:bg-[#121212]/6 sm:col-span-2 lg:col-span-1"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#121212] text-white">
                <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-current">
                  <path d="M12 4a8 8 0 0 0-6.95 11.95L4 20l4.2-1.02A8 8 0 1 0 12 4Zm0 14.5a6.45 6.45 0 0 1-3.3-.9l-.24-.14-2.5.61.62-2.43-.16-.25A6.5 6.5 0 1 1 12 18.5Zm3.57-4.2c-.2-.1-1.16-.57-1.35-.64-.18-.06-.31-.1-.45.1-.13.2-.5.64-.61.76-.11.12-.22.14-.41.05a5.3 5.3 0 0 1-1.56-.96 5.95 5.95 0 0 1-1.1-1.37c-.11-.2-.01-.3.08-.4.09-.09.2-.22.3-.33.1-.12.13-.2.2-.34.07-.13.03-.24-.02-.34-.05-.1-.45-1.07-.61-1.47-.16-.38-.33-.33-.45-.34h-.38a.73.73 0 0 0-.53.25c-.18.2-.69.68-.69 1.66 0 .97.71 1.91.8 2.04.1.13 1.4 2.13 3.4 2.99.47.2.84.31 1.13.4.47.15.9.13 1.24.08.38-.06 1.16-.47 1.33-.92.16-.45.16-.84.11-.92-.05-.08-.18-.13-.38-.23Z" />
                </svg>
              </span>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#121212]/70">{labels.whatsapp}</p>
            </div>
            <p className="mt-2 text-sm font-semibold text-[#121212] underline-offset-4 group-hover:underline">
              {PHONE_DISPLAY}
            </p>
          </a>
        </div>
        <p className="mt-3 text-sm text-[#2d2d2d]">{labels.phoneHours}</p>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="section-title text-2xl font-semibold">{labels.processTitle}</h2>
        <p className="mt-3 leading-relaxed text-[#2d2d2d]">{labels.processDesc}</p>
      </section>
    </main>
  );
}
