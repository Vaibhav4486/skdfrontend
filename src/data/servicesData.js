import { IMG } from './images';

const servicesData = [
  {
    slug: 'home-loans',
    name: 'Home Loans',
    icon: 'home',
    image: IMG.familyHome,
    tagline: 'Finance your dream home with competitive rates and flexible tenure.',
    extra:
      'From Habsiguda apartments to independent houses around Tarnaka, we help Hyderabad families compare lenders, structure tenure around take-home pay, and keep tax benefits (80C and 24(b)) in view. You get one advisor from the first EMI sketch to keys in hand.',
    description:
      "SKD Finance helps you turn homeownership into reality. We work with multiple banks and NBFCs to find the right loan for your income profile and property type, and guide you through every step from application to disbursement — whether you're buying an apartment, constructing a house, or renovating.",
    keyFeatures: [
      'Loan amounts based on property value and eligibility',
      'Interest rates starting from 8.40% p.a.',
      'Flexible tenure up to 30 years',
      'Up to 90% of property value financed',
      'No hidden charges or processing surprises',
      'Guidance on Section 80C and 24(b) tax benefits'
    ],
    eligibility: [
      'Indian resident aged 21–65 years',
      'Salaried or self-employed with regular income',
      'Minimum monthly income of ₹25,000',
      'Stable employment history of 2+ years',
      'Good credit score (CIBIL 700+ preferred)'
    ],
    quickFacts: {
      rate: '8.40% p.a. onwards',
      amount: 'Up to 90% of property value',
      tenure: 'Up to 30 years',
      processing: '7–10 working days'
    },
    documents: [
      'Aadhaar Card (identity proof)',
      'PAN Card (identity proof)',
      'Voter ID / Passport / Driving Licence (address proof)',
      'Salary slips (last 3 months)',
      'Bank statements (last 6 months)',
      'Form 16 / ITR (last 2 years)',
      'Employment certificate / offer letter',
      'Property sale agreement / allotment letter',
      'Property tax receipts',
      'Title deed / property documents',
      'Passport-size photographs (2)'
    ]
  },
  {
    slug: 'mortgage-loans',
    name: 'Mortgage Loans',
    icon: 'building',
    image: IMG.officeGlass,
    tagline: 'Unlock the value of your property for business, education, or personal needs.',
    extra:
      'If you already own a home or commercial unit in East Hyderabad, a loan against property can fund expansion, education, or a second purchase — usually at a lower rate than unsecured credit. We coordinate valuation and paperwork so you keep using the property while it works for you.',
    description:
      'A loan against property lets you borrow against a residential or commercial property you already own, while continuing to use it. It typically offers larger amounts at lower rates than unsecured borrowing. We handle documentation and valuation coordination to get you a fair, quick decision.',
    keyFeatures: [
      'Loan against residential or commercial property',
      'Interest rates starting from 9.50% p.a.',
      'Larger loan amounts than unsecured options',
      'Flexible repayment tenure up to 15 years',
      'Continue to use and own your property',
      'Quick valuation and approval coordination'
    ],
    eligibility: [
      'Property owner aged 25–70 years',
      'Clear property title with no disputes',
      'Salaried, self-employed, or business owner',
      'Minimum income of ₹40,000/month',
      'Property age under 30 years'
    ],
    quickFacts: {
      rate: '9.50% p.a. onwards',
      amount: 'Based on property valuation',
      tenure: 'Up to 15 years',
      processing: '5–7 working days'
    },
    documents: [
      'Aadhaar Card and PAN Card',
      'Address proof (Voter ID / Passport)',
      'Income proof (salary slips / ITR / business financials)',
      'Bank statements (last 12 months)',
      'Property title deed and tax receipts',
      'Encumbrance certificate'
    ]
  },
  {
    slug: 'business-loans',
    name: 'Business Loans',
    icon: 'briefcase',
    image: IMG.meeting,
    tagline: 'Fuel your business growth with unsecured and secured options.',
    extra:
      'Traders, clinics, workshops, and retailers around Tarnaka often need working capital without pausing operations. We match turnover and vintage to lenders who actually underwrite your profile — then stay on the file until money hits the account.',
    description:
      'Whether you need working capital, equipment financing, or funds for expansion, we connect you with lenders suited to your business — traders, manufacturers, service providers, and retailers alike. Minimal documentation, straightforward terms.',
    keyFeatures: [
      'Unsecured loans for smaller amounts, no collateral',
      'Secured loans for larger amounts against property or inventory',
      'Interest rates starting from 11.00% p.a.',
      'Flexible repayment from 1 to 5 years',
      'Minimal documentation required',
      'Support across manufacturing, trading, services, retail'
    ],
    eligibility: [
      'Business vintage of minimum 2 years',
      'Annual turnover of ₹10 lakh or more',
      'Business should be profitable',
      'Sole proprietor, partnership, or Pvt. Ltd.',
      'GST registration mandatory'
    ],
    quickFacts: {
      rate: '11.00% p.a. onwards',
      amount: 'Based on turnover & collateral',
      tenure: '1 to 5 years',
      processing: '48 hours onwards'
    },
    documents: [
      "Aadhaar Card and PAN Card of proprietor/partners",
      'Business registration certificate (Udyam / GST / Shop Act)',
      'GST returns (last 12 months)',
      'Bank statements (last 6 months, business account)',
      'Financial statements / ITR (last 2 years)'
    ]
  },
  {
    slug: 'open-plot-purchase',
    name: 'Open Plot Purchase Loans',
    icon: 'map-pin',
    image: IMG.land,
    tagline: 'Invest in land with financing for residential or commercial plots.',
    extra:
      'Hyderabad plot deals move fast. We help you finance DTCP/HMDA-approved layouts and flag title or layout issues before you commit — so the land you buy is the land the lender will also accept.',
    description:
      'Buying a plot is a significant investment — we help finance the purchase while verifying land title, layout approval, and zoning so you know exactly what you\'re buying into. Available for DTCP/HMDA-approved layouts.',
    keyFeatures: [
      'Finance for residential and commercial plots',
      'Interest rates starting from 9.00% p.a.',
      'Plot within approved layouts (DTCP/HMDA)',
      'Tenure up to 15 years',
      'Title verification assistance included'
    ],
    eligibility: [
      'Indian resident aged 21–65 years',
      'Salaried or self-employed with regular income',
      'Minimum monthly income of ₹30,000',
      'Plot must have clear title and approved layout',
      'Good credit history'
    ],
    quickFacts: {
      rate: '9.00% p.a. onwards',
      amount: 'Up to 80% of plot value',
      tenure: 'Up to 15 years',
      processing: '7–10 working days'
    },
    documents: [
      'Aadhaar Card and PAN Card',
      'Address proof (Voter ID / Passport)',
      'Income proof (salary slips / ITR / business financials)',
      'Bank statements (last 6 months)',
      'Sale agreement / allotment letter',
      'Layout approval and encumbrance certificate'
    ]
  },
  {
    slug: '4-wheeler-loans',
    name: '4-Wheeler Loans',
    icon: 'car',
    image: IMG.car,
    tagline: 'Drive home your car with quick financing at competitive rates.',
    extra:
      'New or used, hatchback or SUV — we line up on-road quotes with EMI you can live with. Fast files, clear processing charges, and a desk in Tarnaka if you prefer to finish paperwork in person.',
    description:
      'Financing for new and used cars with fast approval and minimal paperwork — sedan, SUV, hatchback, or luxury vehicle. We work with lenders offering favorable terms so you get a deal that fits your budget.',
    keyFeatures: [
      'Up to 100% on-road price financing',
      'Interest rates starting from 8.75% p.a.',
      'New and used car loans available',
      'Tenure up to 7 years',
      'Fast approval turnaround'
    ],
    eligibility: [
      'Indian resident aged 21–65 years',
      'Salaried or self-employed with regular income',
      'Minimum monthly income of ₹20,000',
      'Good credit score (CIBIL 700+ preferred)',
      'Valid driving licence'
    ],
    quickFacts: {
      rate: '8.75% p.a. onwards',
      amount: 'Up to 100% on-road price',
      tenure: 'Up to 7 years',
      processing: '24–48 hours'
    },
    documents: [
      'Aadhaar Card and PAN Card',
      'Driving Licence',
      'Address proof (Voter ID / Passport / Utility bill)',
      'Salary slips (last 3 months) / ITR (last 2 years)',
      'Vehicle quotation / proforma invoice'
    ]
  },
  {
    slug: 'income-tax-returns',
    name: 'Income Tax Returns',
    icon: 'file-text',
    image: IMG.documents,
    tagline: 'Accurate ITR filing for individuals, businesses, and companies.',
    extra:
      'Salaried professionals in IT corridors, consultants, and family businesses all file from the same Tarnaka desk. We map deductions, track refunds, and respond to notices so tax season is a calendar item — not a crisis.',
    description:
      'We handle ITR-1 through ITR-7 for salaried individuals, self-employed professionals, businesses, and companies — with attention to eligible deductions, refund tracking, and timely submission to avoid penalties.',
    keyFeatures: [
      'All ITR forms (ITR-1 to ITR-7)',
      'Tax planning and savings consultation',
      'Refund tracking and follow-up',
      'Income tax notice response support',
      'TDS return filing and tax audit support'
    ],
    eligibility: [
      'Salaried individuals with income above ₹2.5 lakh',
      'Self-employed professionals and freelancers',
      'Businesses and companies',
      'NRIs with Indian income sources'
    ],
    quickFacts: {
      rate: '₹499 onwards',
      amount: 'ITR-1 to ITR-7',
      tenure: 'Annual filing',
      processing: '1–3 working days'
    },
    documents: [
      'PAN Card and Aadhaar Card',
      'Form 16 / salary slips (for salaried)',
      'Bank statements (all accounts)',
      'Investment proofs (80C, 80D, etc.)',
      'Capital gains statements, if applicable',
      "Previous year's ITR, if filed"
    ]
  },
  {
    slug: 'gst-services',
    name: 'GST Services',
    icon: 'receipt',
    image: IMG.calculator,
    tagline: 'Registration, filing, and compliance for businesses of all sizes.',
    extra:
      'Registration, GSTR-1 / 3B, annual returns, and reconciliation — handled on a rhythm so you never scramble at 11 p.m. on filing day. Built for Hyderabad traders, service firms, and e-commerce sellers.',
    description:
      'End-to-end GST support — registration, monthly and quarterly return filing, annual returns, and reconciliation — so you stay compliant without chasing deadlines yourself. We serve traders, manufacturers, service providers, and e-commerce sellers.',
    keyFeatures: [
      'GST registration (Regular, Composition, Casual)',
      'Monthly and quarterly return filing',
      'Annual return (GSTR-9) filing',
      'GST reconciliation and matching',
      'Notice and audit response support'
    ],
    eligibility: [
      'Businesses with turnover above ₹40 lakh (goods)',
      'Service providers with turnover above ₹20 lakh',
      'E-commerce sellers (mandatory registration)',
      'Voluntary registration also supported'
    ],
    quickFacts: {
      rate: '₹999/month onwards',
      amount: 'GSTR-1, 3B, 9, 9C',
      tenure: 'Monthly / Quarterly / Annual',
      processing: 'Same-day filing'
    },
    documents: [
      'PAN Card of business / proprietor',
      'Aadhaar Card of authorized signatory',
      'Business registration certificate',
      'Address proof of business premises',
      'Bank account details'
    ]
  },
  {
    slug: 'labour-licence',
    name: 'Labour Licence',
    icon: 'hard-hat',
    image: IMG.construction,
    tagline: 'Obtain and renew contractor licences with full compliance support.',
    extra:
      'Contractors and site teams in and around Hyderabad need licences on time. We prepare Form V/VI, chase the labour department, and set renewal reminders so a missing paper never stops a project.',
    description:
      'Contractors engaging 20 or more workers need a labour licence under the Contract Labour (Regulation and Abolition) Act, 1970. We handle the application, renewal, and liaison with the labour department so your business stays compliant.',
    keyFeatures: [
      'Contractor labour licence application',
      'Renewal of existing licences',
      'Form V and Form VI processing',
      'PF, ESI, and gratuity compliance guidance',
      'Liaison with the labour department'
    ],
    eligibility: [
      'Contractors engaging 20 or more workers',
      'Construction companies with contract labour',
      'Manufacturing units using contract labour'
    ],
    quickFacts: {
      rate: '₹2,999 onwards',
      amount: '1–2 year validity',
      tenure: 'Renewal 30 days before expiry',
      processing: '15–30 working days'
    },
    documents: [
      'PAN Card of contractor / firm',
      'Aadhaar Card of contractor',
      'Business registration certificate',
      'Partnership deed / company registration',
      'Details of employees (name, designation, wages)'
    ]
  }
];

export default servicesData;

export function getServiceBySlug(slug) {
  return servicesData.find((s) => s.slug === slug);
}
