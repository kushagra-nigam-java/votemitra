// VOTEमित्र — Decision Tree Data
const FLOW_DATA = {
  init: {
    id: 'init', step: 'Start', vrl: 5,
    context: "Welcome to VOTEमित्र — Your Personal Election Navigator. Let's determine where you are in your voting journey.",
    guidance: 'Choose your situation below to get personalized, step-by-step guidance through the Indian election process.',
    actions: [],
    critical: '',
    options: [
      { label: 'I am a first-time voter', next: 'first_time_1' },
      { label: 'I moved to a new city', next: 'migration_1' },
      { label: 'My name is missing from the voter list', next: 'missing_1' },
      { label: 'I want to check my voting date', next: 'timeline_1' },
      { label: 'I already voted / want to know what happens next', next: 'post_vote_1' },
      { label: "I'm not sure where to start", next: 'unsure_1' }
    ]
  },

  // === FIRST-TIME VOTER ===
  first_time_1: {
    id: 'first_time_1', step: 'Eligibility Check', vrl: 15,
    context: 'Great! Let us first confirm your eligibility to vote in Indian elections.',
    guidance: 'To register as a voter in India, you must meet all of the following criteria:',
    actions: [
      'You must be an Indian citizen.',
      'You must be at least 18 years old on the qualifying date (January 1 of the year of electoral roll revision).',
      'You must be a resident of the constituency where you wish to register.',
      'You must not be disqualified under any law (e.g., unsound mind, corrupt practices).'
    ],
    critical: 'The qualifying date for age is January 1 of the current year. If you turn 18 after January 1, you may have to wait for the next revision unless a special drive is announced.',
    options: [
      { label: 'I meet all criteria — help me register', next: 'first_time_2' },
      { label: 'I am not yet 18', next: 'first_time_underage' },
      { label: 'I am an NRI — can I vote?', next: 'first_time_nri' },
      { label: 'Go back', next: 'init' }
    ]
  },
  first_time_2: {
    id: 'first_time_2', step: 'Registration Process', vrl: 30,
    context: 'You are eligible. Now let us get you registered on the electoral roll.',
    guidance: 'You need to fill Form 6 (Application for Inclusion of Name in Electoral Roll). You can do this online or offline.',
    actions: [
      'Online: Visit the National Voters Service Portal (voters.eci.gov.in) or download the Voter Helpline App.',
      'Click on "New Voter Registration" and select Form 6.',
      'Fill in your personal details: name, age, address, family member already on the roll.',
      'Upload documents: passport-size photo, age proof (birth certificate, 10th marksheet, or passport), address proof (Aadhaar, utility bill, bank passbook).',
      'Submit the form and note down your Reference ID.'
    ],
    critical: 'Keep your Reference ID safe. You will need it to track your application status.',
    options: [
      { label: 'I submitted the form — what next?', next: 'first_time_3' },
      { label: 'I want to register offline instead', next: 'first_time_offline' },
      { label: 'What documents do I need?', next: 'docs_1' },
      { label: 'Go back', next: 'first_time_1' }
    ]
  },
  first_time_3: {
    id: 'first_time_3', step: 'Verification', vrl: 50,
    context: 'Your application is submitted. Here is what happens during verification.',
    guidance: 'After submission, a Booth Level Officer (BLO) will visit your address for physical verification. This is a standard process.',
    actions: [
      'The BLO will visit your residence to verify your identity and address.',
      'Keep your original documents ready for inspection.',
      'If you are not home, the BLO may leave a notice — respond promptly.',
      'You can track your application status on the NVSP portal using your Reference ID.',
      'Once approved, your name will appear on the electoral roll and you will receive your EPIC (Voter ID card).'
    ],
    critical: 'BLO visits usually happen within 15–30 days of application. If nobody visits within 45 days, file a follow-up on the NVSP portal or call 1950 (Voter Helpline).',
    options: [
      { label: 'My application was approved!', next: 'first_time_ready' },
      { label: 'My application was rejected — what do I do?', next: 'first_time_rejected' },
      { label: 'Nobody visited me yet', next: 'first_time_no_visit' },
      { label: 'Go back', next: 'first_time_2' }
    ]
  },
  first_time_ready: {
    id: 'first_time_ready', step: 'Ready to Vote', vrl: 85,
    context: 'Congratulations! You are now a registered voter.',
    guidance: 'Your name is on the electoral roll and you are ready to vote. Here is how to prepare for election day.',
    actions: [
      'Find your polling booth: visit voters.eci.gov.in or use the Voter Helpline App.',
      'Carry a valid photo ID on election day (EPIC is preferred, but 11 other IDs are accepted).',
      'Check your constituency and candidate list before election day.',
      'Voting hours are typically 7:00 AM to 6:00 PM — plan to arrive early.',
      'After voting, you will receive an indelible ink mark on your finger.'
    ],
    critical: 'Election day is a paid holiday. Your employer cannot deny you time to vote.',
    options: [
      { label: 'What ID can I carry if I lost my Voter ID?', next: 'docs_1' },
      { label: 'How does the EVM/VVPAT work?', next: 'post_vote_evm' },
      { label: 'Start over', next: 'init' }
    ]
  },
  first_time_underage: {
    id: 'first_time_underage', step: 'Not Yet Eligible', vrl: 10,
    context: 'You are not yet eligible to vote, but you can prepare ahead of time.',
    guidance: 'If you will turn 18 before January 1 of the next year, you can pre-register during special enrollment drives.',
    actions: [
      'Check if your state has an upcoming Special Summary Revision (usually Oct–Nov each year).',
      'Download the Voter Helpline App and set a reminder.',
      'Gather your documents in advance: age proof, address proof, passport photo.',
      'Encourage eligible friends and family to register and vote.'
    ],
    critical: 'You cannot vote until your name appears on the final electoral roll after turning 18.',
    options: [
      { label: 'What documents should I prepare?', next: 'docs_1' },
      { label: 'Start over', next: 'init' }
    ]
  },
  first_time_nri: {
    id: 'first_time_nri', step: 'NRI Voting', vrl: 15,
    context: 'NRI citizens can register as overseas electors under the Representation of the People Act.',
    guidance: 'As an NRI, you can vote in person at your constituency polling booth. Postal ballot for NRIs has been proposed but is not yet implemented as of 2024.',
    actions: [
      'Fill Form 6A (Application for Registration as Overseas Elector) on the NVSP portal.',
      'Upload a self-attested copy of your valid Indian passport.',
      'Your name will be added to the electoral roll of your original constituency.',
      'You must be physically present at the polling booth on election day to vote.',
      'Carry your original Indian passport as your identity document.'
    ],
    critical: 'NRI voters must vote in person — no proxy or postal voting is currently available for overseas electors.',
    options: [
      { label: 'Go back', next: 'first_time_1' },
      { label: 'Start over', next: 'init' }
    ]
  },
  first_time_offline: {
    id: 'first_time_offline', step: 'Offline Registration', vrl: 25,
    context: 'You can also register offline by submitting a physical Form 6.',
    guidance: 'Visit your nearest Electoral Registration Office (ERO) or contact your local BLO.',
    actions: [
      'Download Form 6 from eci.gov.in or collect it from the ERO office.',
      'Fill it in legibly with blue/black ink.',
      'Attach two passport-size photos, age proof, and address proof (self-attested photocopies).',
      'Submit the form to the ERO or hand it to your BLO.',
      'Collect the acknowledgment receipt with your Reference ID.'
    ],
    critical: 'Processing time for offline forms may be longer. Online submission is recommended for faster tracking.',
    options: [
      { label: 'What happens after I submit?', next: 'first_time_3' },
      { label: 'Go back', next: 'first_time_2' }
    ]
  },
  first_time_rejected: {
    id: 'first_time_rejected', step: 'Application Rejected', vrl: 20,
    context: 'Your application was rejected. Do not worry — most rejections are fixable.',
    guidance: 'Common reasons for rejection include incomplete documents, unclear photos, or address mismatch.',
    actions: [
      'Check the rejection reason on the NVSP portal using your Reference ID.',
      'Common fixes: re-upload a clearer photo, correct your address, or provide additional documents.',
      'Re-submit Form 6 with the corrections.',
      'If you believe the rejection is incorrect, file an appeal with the ERO.',
      'Call 1950 (Voter Helpline) for assistance.'
    ],
    critical: 'You have the right to appeal a rejection. Contact your District Election Officer if the issue persists.',
    options: [
      { label: 'Re-submit my application', next: 'first_time_2' },
      { label: 'Start over', next: 'init' }
    ]
  },
  first_time_no_visit: {
    id: 'first_time_no_visit', step: 'Follow Up', vrl: 35,
    context: 'If no BLO has visited you, here is how to follow up.',
    guidance: 'Delays can happen due to high application volume. Take proactive steps.',
    actions: [
      'Track your application on voters.eci.gov.in using your Reference ID.',
      'Call 1950 (Voter Helpline) and provide your Reference ID.',
      'Visit your local ERO office in person with your application receipt.',
      'You can also reach out via the Voter Helpline App grievance section.'
    ],
    critical: 'Do not wait too long. If an election is approaching, escalate immediately through the helpline.',
    options: [
      { label: 'Go back', next: 'first_time_3' },
      { label: 'Start over', next: 'init' }
    ]
  },

  // === MIGRATION ===
  migration_1: {
    id: 'migration_1', step: 'Migration Assessment', vrl: 15,
    context: 'You have moved to a new city. Let us figure out the best approach for you.',
    guidance: 'You have two main options: transfer your voter registration to your new city, or travel back to your old constituency to vote.',
    actions: [
      'Option 1: Transfer your registration (recommended if you plan to stay in the new city long-term).',
      'Option 2: Travel back to your original constituency on election day.',
      'Consider: transfer takes 4–6 weeks. If an election is imminent, traveling back may be more practical.'
    ],
    critical: 'You can only vote in the constituency where your name appears on the electoral roll. Voting in the wrong constituency is not allowed.',
    options: [
      { label: 'I want to transfer my registration', next: 'migration_transfer' },
      { label: 'I will travel back to vote', next: 'migration_travel' },
      { label: 'How long does transfer take?', next: 'migration_timeline' },
      { label: 'Go back', next: 'init' }
    ]
  },
  migration_transfer: {
    id: 'migration_transfer', step: 'Transfer Registration', vrl: 35,
    context: 'Let us transfer your voter registration to your new address.',
    guidance: 'You need to fill Form 6 for inclusion in the new constituency. Your name will be removed from the old roll automatically.',
    actions: [
      'Visit voters.eci.gov.in or use the Voter Helpline App.',
      'Fill Form 6 — select "Shifting from another constituency" as the reason.',
      'Provide your new address proof (rental agreement, utility bill, Aadhaar with updated address).',
      'Upload your existing EPIC number and details of your old constituency.',
      'Submit and note your Reference ID.'
    ],
    critical: 'Your old voter registration will be automatically cancelled once the new one is approved. You cannot be registered in two places.',
    options: [
      { label: 'What happens after I submit?', next: 'first_time_3' },
      { label: 'Go back', next: 'migration_1' }
    ]
  },
  migration_travel: {
    id: 'migration_travel', step: 'Travel to Vote', vrl: 60,
    context: 'You have decided to travel back to your original constituency to vote.',
    guidance: 'Make sure your name is still on the electoral roll in your old constituency.',
    actions: [
      'Verify your name on the voter list: visit voters.eci.gov.in or call 1950.',
      'Plan your travel in advance — book tickets early as election dates see heavy demand.',
      'Carry your EPIC or any valid photo ID.',
      'Find your polling booth location using the Voter Helpline App.',
      'Election day is a paid holiday — inform your employer in advance.'
    ],
    critical: 'If your name has been removed from the old constituency roll (due to BLO updates), you will not be able to vote. Verify well in advance.',
    options: [
      { label: 'How do I check if my name is on the list?', next: 'missing_1' },
      { label: 'Go back', next: 'migration_1' },
      { label: 'Start over', next: 'init' }
    ]
  },
  migration_timeline: {
    id: 'migration_timeline', step: 'Transfer Timeline', vrl: 20,
    context: 'Here is the typical timeline for a voter registration transfer.',
    guidance: 'The process involves application submission, BLO verification at your new address, and approval by the ERO.',
    actions: [
      'Application submission: Day 1.',
      'BLO verification visit: Within 15–30 days.',
      'ERO approval and roll update: 7–15 days after verification.',
      'Total estimated time: 4–6 weeks in normal circumstances.',
      'During election periods, processing may be faster due to special drives.'
    ],
    critical: 'If an election is less than 6 weeks away and you have not started the transfer, consider traveling back to your old constituency instead.',
    options: [
      { label: 'Start the transfer process', next: 'migration_transfer' },
      { label: 'I will travel back instead', next: 'migration_travel' },
      { label: 'Go back', next: 'migration_1' }
    ]
  },

  // === MISSING NAME ===
  missing_1: {
    id: 'missing_1', step: 'Voter List Check', vrl: 20,
    context: 'Let us check if your name is on the electoral roll and fix any issues.',
    guidance: 'There are several ways to search for your name on the voter list.',
    actions: [
      'Online: Visit voters.eci.gov.in > "Search in Electoral Roll".',
      'By App: Download the Voter Helpline App and search by name or EPIC number.',
      'By SMS: Send SMS "EPIC <your EPIC number>" to 1950.',
      'By Phone: Call 1950 (Voter Helpline) and provide your details.'
    ],
    critical: 'Search using multiple methods. Sometimes names appear with slight spelling variations.',
    options: [
      { label: 'My name is on the list!', next: 'first_time_ready' },
      { label: 'My name is NOT on the list', next: 'missing_2' },
      { label: 'My name has errors (wrong spelling, address, etc.)', next: 'missing_correction' },
      { label: 'Go back', next: 'init' }
    ]
  },
  missing_2: {
    id: 'missing_2', step: 'Name Missing — Action', vrl: 15,
    context: 'Your name is missing from the electoral roll. Here are the steps to fix this.',
    guidance: 'Your name may have been removed during a routine revision, or it may never have been added. Either way, you can re-apply.',
    actions: [
      'File Form 6 for fresh inclusion — same process as new registration.',
      'Visit voters.eci.gov.in or use the Voter Helpline App.',
      'If you had a previous EPIC number, mention it in the form.',
      'Contact your local BLO — they can help expedite the process.',
      'If an election is imminent, visit the ERO office in person for urgent processing.'
    ],
    critical: 'If election day is within 2 weeks and your name is missing, you will likely not be able to vote in this election. Start the process immediately for the next one.',
    options: [
      { label: 'Start new registration', next: 'first_time_2' },
      { label: 'Go back', next: 'missing_1' },
      { label: 'Start over', next: 'init' }
    ]
  },
  missing_correction: {
    id: 'missing_correction', step: 'Correction Process', vrl: 40,
    context: 'Your name is on the list but has errors. Let us correct them.',
    guidance: 'Use Form 8 to correct details in your existing voter registration.',
    actions: [
      'Visit voters.eci.gov.in > "Correction of Entries in Electoral Roll".',
      'Select Form 8 and choose what needs correction (name, age, address, photo, etc.).',
      'Upload supporting documents for the correction.',
      'Submit and note your Reference ID.',
      'The BLO may visit for verification depending on the type of correction.'
    ],
    critical: 'Minor corrections (spelling) are usually processed within 1–2 weeks. Major corrections (address change to another constituency) may require Form 6 instead.',
    options: [
      { label: 'I submitted the correction', next: 'first_time_3' },
      { label: 'Go back', next: 'missing_1' }
    ]
  },

  // === TIMELINE ===
  timeline_1: {
    id: 'timeline_1', step: 'Election Timeline', vrl: 30,
    context: 'Let us find out your election dates and help you prepare.',
    guidance: 'Indian elections can be phased across multiple dates. Your voting date depends on your constituency.',
    actions: [
      'Visit eci.gov.in for the official election schedule.',
      'Check the Voter Helpline App for your constituency-specific date.',
      'General Elections are held every 5 years. State elections follow separate schedules.',
      'By-elections may be called for vacant seats at any time.'
    ],
    critical: 'Once the Election Commission announces dates, the Model Code of Conduct comes into effect immediately. Campaign rules change.',
    options: [
      { label: 'I know my date — help me prepare', next: 'first_time_ready' },
      { label: 'I want to understand the phases', next: 'timeline_phases' },
      { label: 'Go back', next: 'init' }
    ]
  },
  timeline_phases: {
    id: 'timeline_phases', step: 'Election Phases', vrl: 40,
    context: 'Indian general elections are conducted in multiple phases across the country.',
    guidance: 'The Election Commission divides constituencies into phases based on security requirements, logistics, and geography.',
    actions: [
      'Phase dates and constituencies are announced by the ECI well in advance.',
      'Each phase covers specific parliamentary/assembly constituencies.',
      'Results are counted on a single date after all phases are complete.',
      'You vote only in YOUR constituency on YOUR phase date.',
      'Check eci.gov.in or the Voter Helpline App for your specific phase.'
    ],
    critical: 'You cannot vote in a different phase. Make sure you know which phase covers your constituency.',
    options: [
      { label: 'Help me prepare for election day', next: 'first_time_ready' },
      { label: 'Go back', next: 'timeline_1' }
    ]
  },

  // === POST-VOTE ===
  post_vote_1: {
    id: 'post_vote_1', step: 'Post-Voting', vrl: 95,
    context: 'You have voted! Here is what happens after you cast your ballot.',
    guidance: 'The journey from ballot to result involves several transparent steps designed to ensure fair counting.',
    actions: [
      'After polling closes, EVMs are sealed and transported to a central counting center under security escort.',
      'Counting day: EVMs are opened in front of candidates/agents and media.',
      'VVPAT slips from randomly selected booths are matched with EVM counts for verification.',
      'Results are declared constituency by constituency on counting day.',
      'The winning candidate receives a Certificate of Election from the Returning Officer.'
    ],
    critical: 'Counting day results are usually available by evening. Follow results on results.eci.gov.in.',
    options: [
      { label: 'How does the EVM / VVPAT work?', next: 'post_vote_evm' },
      { label: 'What is NOTA?', next: 'post_vote_nota' },
      { label: 'Start over', next: 'init' }
    ]
  },
  post_vote_evm: {
    id: 'post_vote_evm', step: 'EVM & VVPAT', vrl: 95,
    context: 'Understanding how the Electronic Voting Machine and VVPAT work.',
    guidance: 'India uses a three-unit system: Ballot Unit, Control Unit, and VVPAT.',
    actions: [
      'Ballot Unit: Displays candidate names and symbols. You press the button next to your choice.',
      'Control Unit: Operated by the presiding officer. Records votes securely.',
      'VVPAT: After you press the button, a printed slip shows your vote for 7 seconds before dropping into a sealed box.',
      'EVMs are standalone machines — they are NOT connected to any network or the internet.',
      'Each EVM is tested multiple times (First Level Check, mock poll on election morning) before use.'
    ],
    critical: 'If the VVPAT slip does not match your choice, you can report it immediately to the presiding officer. You have the right to a test vote.',
    options: [
      { label: 'Go back', next: 'post_vote_1' },
      { label: 'Start over', next: 'init' }
    ]
  },
  post_vote_nota: {
    id: 'post_vote_nota', step: 'NOTA', vrl: 95,
    context: 'Understanding the NOTA (None Of The Above) option.',
    guidance: 'NOTA is a valid voting option available on every EVM in India since 2013.',
    actions: [
      'NOTA is the last button on the Ballot Unit.',
      'It allows you to officially register that you do not support any candidate.',
      'NOTA votes are counted and reported in the results.',
      'However, even if NOTA gets the most votes, the candidate with the next highest count wins.',
      'NOTA is a form of democratic expression — it signals voter dissatisfaction.'
    ],
    critical: 'Choosing NOTA is completely valid and maintains the secrecy of your ballot. Nobody can know you chose NOTA.',
    options: [
      { label: 'Go back', next: 'post_vote_1' },
      { label: 'Start over', next: 'init' }
    ]
  },

  // === UNSURE ===
  unsure_1: {
    id: 'unsure_1', step: 'Getting Started', vrl: 5,
    context: 'No worries — let me help you figure out where you stand.',
    guidance: 'Answer a couple of quick questions and I will guide you to the right place.',
    actions: [
      'First, check if you have a Voter ID (EPIC card) — it is a blue/red card with your photo and an EPIC number.',
      'If yes, your name is likely on the voter list. We can verify.',
      'If no, you may need to register for the first time.',
      'If you had one but lost it, you can get a duplicate.'
    ],
    critical: 'Not having a Voter ID does not necessarily mean you cannot vote. 11 other photo IDs are accepted at the booth.',
    options: [
      { label: 'I have a Voter ID', next: 'missing_1' },
      { label: 'I do not have a Voter ID', next: 'first_time_1' },
      { label: 'I had one but lost it', next: 'docs_1' },
      { label: 'Go back', next: 'init' }
    ]
  },

  // === DOCUMENTS ===
  docs_1: {
    id: 'docs_1', step: 'Accepted Documents', vrl: 50,
    context: 'Here are all the identity documents accepted at the polling booth.',
    guidance: 'You do NOT need your Voter ID (EPIC) to vote. Any ONE of the following 12 documents is accepted.',
    actions: [
      '1. EPIC (Voter ID Card)',
      '2. Aadhaar Card',
      '3. Passport',
      '4. Driving License',
      '5. PAN Card',
      '6. Service ID (Government / PSU employees)',
      '7. MNREGA Job Card',
      '8. Health Insurance Smart Card (under Ayushman Bharat)',
      '9. Bank / Post Office Passbook with Photo',
      '10. Smart Card issued by RGI under NPR',
      '11. Pension document with photograph',
      '12. Official ID by MP / MLA / MLC'
    ],
    critical: 'The document must have your photograph. Carry the original, not a photocopy.',
    options: [
      { label: 'I have one of these — help me prepare for election day', next: 'first_time_ready' },
      { label: 'I do not have any of these documents', next: 'docs_none' },
      { label: 'Go back', next: 'init' }
    ]
  },
  docs_none: {
    id: 'docs_none', step: 'No Documents', vrl: 15,
    context: 'If you do not have any of the accepted photo IDs, here is what you can do.',
    guidance: 'You need at least one valid photo ID to vote. Here is how to obtain one.',
    actions: [
      'Aadhaar Card: Visit your nearest Aadhaar Enrollment Center. It is free.',
      'Voter ID (EPIC): Apply via Form 6 on voters.eci.gov.in.',
      'Driving License: Apply at your nearest RTO or via Parivahan (parivahan.gov.in).',
      'PAN Card: Apply online at incometax.gov.in (costs Rs. 107).',
      'Start with Aadhaar — it is the fastest and most widely useful.'
    ],
    critical: 'Getting an Aadhaar takes 2–4 weeks. Start immediately if an election is approaching.',
    options: [
      { label: 'Start voter registration', next: 'first_time_2' },
      { label: 'Go back', next: 'docs_1' },
      { label: 'Start over', next: 'init' }
    ]
  }
};

const STATES_DATA = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh','Chandigarh',
  'Puducherry','Andaman & Nicobar Islands','Dadra & Nagar Haveli and Daman & Diu','Lakshadweep'
];

// Globals: FLOW_DATA, STATES_DATA
