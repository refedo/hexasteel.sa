/** HEXA Steel® Knowledge Centre — practical manufacturing & management lessons.
 * Dates are original lesson dates, not historic claims of website publication.
 * All case numbers are deliberately illustrative, never actual company performance.
 */
export type ManagementLesson = {
  slug:string;date:string;category:string;title:string;intro:string;
  sections:[string,string][];
  resource:{title:string;creator:string;format:string;time:string;url:string};
};
export const managementLessons:ManagementLesson[] = [
  {
    "slug": "theory-of-constraints-factory-bottleneck",
    "date": "2026-10-09",
    "category": "Manufacturing Excellence",
    "title": "The Theory of Constraints: Why Your Factory's Bottleneck Determines Output",
    "intro": "Why adding capacity to the wrong workstation can increase work-in-progress without increasing steel deliveries.",
    "sections": [
      [
        "The principle",
        "The Theory of Constraints (TOC) treats a production system as interconnected activities. Its output is governed by the limiting resource, not by the sum of machine nameplate capacities. Start by identifying the current constraint, exploiting the capacity already available there, coordinating other resources around it, and only then considering investment to elevate it. Reassess the constraint whenever the production mix or flow changes."
      ],
      [
        "Worked example — illustrative",
        "Consider cutting at 24 tons/day, fabrication at 12 tons/day and coating at 18 tons/day on the same product route. Sustainable throughput is at most 12 tons/day, even though cutting can do twice as much. Over 22 working days, that is 264 tons. Improving fabrication to 16 tons/day could raise the route ceiling to 352 tons/month, provided demand, labor, materials, handling and all downstream processes can support it."
      ],
      [
        "Apply at HEXA Steel®",
        "Map sheet and profile cutting, PEB-only automatic assembly/SAW, conventional fabrication, MIG welding, grinding, dispatch, subcontracted coating, packing and delivery. Model the structural-steel and PEB routes separately. Use standard labor- or machine-hours for complex assemblies; tons alone mask weld density and geometry. Include overhead-crane and forklift availability, since the factories are separated."
      ],
      [
        "Common mistake",
        "Buying another laser because cutting is visibly busy. If fabrication or handling is limiting delivered output, more cutting may only generate inventory and floor congestion. The busiest process is not necessarily the true system constraint."
      ],
      [
        "Executive action",
        "For the last four weeks, compare work-center effective capacity, demand in standard hours, ready-work queues, starvation time and completed delivery tonnage. Identify the one improvement that would actually increase accepted, deliverable output."
      ]
    ],
    "resource": {
      "title": "The Five Focusing Steps (POOGI)",
      "creator": "Theory of Constraints Institute",
      "format": "Article",
      "time": "Approximately 8–12 minutes",
      "url": "https://www.tocinstitute.org/five-focusing-steps.html"
    }
  },
  {
    "slug": "littles-law-work-in-progress-lead-time",
    "date": "2026-10-10",
    "category": "Manufacturing Excellence",
    "title": "Little's Law: Why More Production Can Mean Slower Delivery",
    "intro": "How average work-in-progress, throughput and flow time expose congestion and tied-up working capital.",
    "sections": [
      [
        "The principle",
        "Little's Law connects three long-run averages in a stable system: average WIP = throughput rate × average flow time. Therefore average flow time = average WIP / throughput rate. The measurement boundary and units must be consistent: jobs entering and leaving the same production system, over a period sufficiently stable to make averages meaningful."
      ],
      [
        "Worked example — illustrative",
        "Suppose a steel workshop holds an average 120 tons of unfinished work while completing 15 tons/day. Average flow time is 120 / 15 = eight working days. At unchanged throughput, a target of five working days implies 75 tons of average WIP, a 37.5% reduction. This is a mathematical relationship, not an instruction to remove the protective buffer that keeps the bottleneck working."
      ],
      [
        "Apply at HEXA Steel®",
        "Track released work packages from first production operation through final completion. Include waiting between Factory 001 and Factory 003, dispatch to coating, and coating turnaround when defining the chosen boundary. Separate conventional structural steel from PEB and use assembly-level data when mixes vary. Measure WIP daily and completions for the same route and period."
      ],
      [
        "Common mistake",
        "Releasing more cutting jobs to make lasers look productive while the welding queue already exceeds downstream capacity. More WIP can increase handling, searching, and waiting without raising throughput."
      ],
      [
        "Executive action",
        "Calculate average WIP in tons and daily completed tonnage over four weeks; divide the first by the second. Compare the result with measured elapsed times in OTS™. Investigate differences before setting WIP limits."
      ]
    ],
    "resource": {
      "title": "Are There 'Laws' of Manufacturing?",
      "creator": "John D. C. Little, National Academies Press",
      "format": "Book chapter",
      "time": "Approximately 12–18 minutes",
      "url": "https://www.nationalacademies.org/read/1867/chapter/22"
    }
  },
  {
    "slug": "sales-funnel-leakage-revenue-conversion",
    "date": "2026-10-11",
    "category": "Business Consulting",
    "title": "Sales Funnel Leakage: Find Where Revenue Is Being Lost",
    "intro": "Diagnose commercial underperformance before deciding that more salespeople or more RFQs are needed.",
    "sections": [
      [
        "The principle",
        "Sales funnel leakage measures the conversion of opportunities between defined stages. A well-designed pipeline uses consistent criteria to distinguish RFQs received, qualified, quoted, decided, won and lost. Stage conversion rates locate the point worth investigating; they do not, by themselves, explain why opportunities disappear."
      ],
      [
        "Worked example — illustrative",
        "A fabrication company receives 100 RFQs, qualifies 80, quotes 60 and wins 12 contracts. The quotation-to-win rate is 12/60 = 20%. If that rate rises to 25% on the same 60 quotations, wins increase from 12 to 15. At SAR 250,000 per award, quarterly bookings would rise from SAR 3 million to SAR 3.75 million. This is a hypothetical opportunity, not a guaranteed outcome or a profit forecast."
      ],
      [
        "Apply at HEXA Steel®",
        "Analyze RFQs by customer, project category, sales engineer, quoted value and expected contribution margin. Record quotation cycle time, scope clarifications, negotiation history and verified win/loss reasons. Use quotation cohorts and exclude still-pending decisions from closed-deal win-rate denominators."
      ],
      [
        "Common mistake",
        "Hiring additional sales engineers when existing quotations are delayed, poorly qualified or priced below the required economic return. Equally, improving win rate through indiscriminate discounting may reduce profitability."
      ],
      [
        "Executive action",
        "Build a 90-day RFQ-to-award funnel and identify the largest preventable drop-off. Interview owners of at least five lost quotations before changing sales staffing or pricing policy."
      ]
    ],
    "resource": {
      "title": "Sales pipeline stages: My blueprint for what to look for at each stage",
      "creator": "Mark Burdon, HubSpot",
      "format": "Article",
      "time": "Approximately 10–15 minutes",
      "url": "https://blog.hubspot.com/sales/sales-pipeline-stages-visual-guide"
    }
  },
  {
    "slug": "effective-capacity-overall-equipment-effectiveness",
    "date": "2026-10-12",
    "category": "Manufacturing Excellence",
    "title": "Effective Capacity: Why Your Factory Produces Less Than Its Machines Can",
    "intro": "Translate available machine hours into realistic output using availability, performance and quality losses.",
    "sections": [
      [
        "The principle",
        "Overall Equipment Effectiveness (OEE) equals Availability × Performance × Quality. It compares accepted output with the ideal output during planned production time, provided the ideal rate and time boundary are defined consistently. OEE is useful for repeatable equipment processes, but it is not a universal metric for labor crews, cranes or mixed-product factory capacity."
      ],
      [
        "Worked example — illustrative",
        "A PEB assembly/welding line is scheduled for 22 days × 8 hours/day at an assumed ideal 1.5 tons/hour: 264 theoretical tons/month. At 85% availability, 80% performance and 98% first-pass acceptable quality, OEE is 66.64% and expected good output is about 176 tons. Increasing only availability to 90% would yield about 186 tons, roughly 10 additional tons/month if other process limits permit."
      ],
      [
        "Apply at HEXA Steel®",
        "Measure each laser and the PEB automatic line independently. Record scheduled time, running time, speed relative to approved standard rates by material and geometry, first-pass output, downtime categories and rework. For fabrication and welding crews, compare earned standard hours with available labor-hours instead of treating people as machines."
      ],
      [
        "Common mistake",
        "Using a high utilization figure as evidence of high productivity. A laser operating continuously on parts that the next operation cannot accept may inflate inventory rather than finished output. Also avoid invented universal OEE targets."
      ],
      [
        "Executive action",
        "Collect five days of time, downtime, throughput, ideal rate and quality data for the PEB line or 20 kW laser. Quantify the three largest losses and check whether the resource constrains overall throughput."
      ]
    ],
    "resource": {
      "title": "OEE Implementation: Quick Guide for Measuring OEE",
      "creator": "Vorne / OEE.com",
      "format": "Technical guide",
      "time": "Approximately 10–15 minutes",
      "url": "https://www.oee.com/implementing-oee/"
    }
  },
  {
    "slug": "cash-conversion-cycle-profitable-but-cash-poor",
    "date": "2026-10-13",
    "category": "Business Consulting",
    "title": "Cash Conversion Cycle: Why Profitable Companies Run Out of Cash",
    "intro": "Connect inventory, receivables, payables and contractual milestones to the liquidity required for growth.",
    "sections": [
      [
        "The principle",
        "The cash conversion cycle (CCC) is Days Inventory Outstanding + Days Sales Outstanding − Days Payable Outstanding. It indicates how long working capital remains tied up, after taking supplier terms into account. Accounting profit and cash collection occur at different times; a profitable project can consume substantial cash before the customer pays."
      ],
      [
        "Worked example — illustrative",
        "Suppose an SME has DIO of 45 days, DSO of 65 days and DPO of 30 days. CCC is 80 days. Reducing DSO to 50 days shortens it to 65. At steady annual revenue of SAR 18 million, 15 days of average sales represent approximately SAR 740,000 of receivables potentially released. This is a working-capital change, not added profit or a recurring annual saving."
      ],
      [
        "Apply at HEXA Steel®",
        "Project-based fabrication requires more than company-level CCC. Model cash movements by contract: material advances, supplier due dates, fabrication progress, milestone invoicing, certified claims, retention and collection assumptions. A 13-week rolling forecast can show payroll and procurement peaks before revenue receipts."
      ],
      [
        "Common mistake",
        "Comparing contracts on gross margin alone. An identical-margin contract with a significant advance can be materially less risky than one requiring full materials funding and payment long after delivery."
      ],
      [
        "Executive action",
        "Ask Finance for receivables aging, inventory/WIP value, near-term payables and a 13-week cash forecast. Identify which active contracts create the largest peak cash deficits."
      ]
    ],
    "resource": {
      "title": "Cash Conversion Cycle",
      "creator": "Corporate Finance Institute (CFI Team)",
      "format": "Article",
      "time": "Approximately 6–10 minutes",
      "url": "https://corporatefinanceinstitute.com/resources/accounting/cash-conversion-cycle/"
    }
  },
  {
    "slug": "throughput-accounting-product-mix",
    "date": "2026-10-16",
    "category": "Manufacturing Excellence",
    "title": "Throughput Accounting: Are You Accepting the Most Profitable Projects?",
    "intro": "When a capacity constraint binds, compare contribution per constrained hour rather than sales or margin per ton.",
    "sections": [
      [
        "The principle",
        "Throughput accounting focuses on sales less truly variable costs and the rate at which the system converts constrained capacity into contribution. For short-term prioritization when one resource is binding, compare throughput contribution per hour of that resource. This supplements, rather than replaces, full contract costing, cash-flow analysis and risk assessment."
      ],
      [
        "Worked example — illustrative",
        "Structural steel sells for SAR 6,000/ton with SAR 4,200 truly variable cost and requires three bottleneck hours: SAR 600 per constrained hour. PEB sells for SAR 7,000/ton, costs SAR 4,600 variable and requires six hours: SAR 400/hour. With 300 available hours, 50 tons of PEB yield SAR 120,000 contribution. If demand permits, 60 tons structural steel plus 20 tons PEB use the same 300 hours and yield SAR 156,000: SAR 36,000 more."
      ],
      [
        "Apply at HEXA Steel®",
        "Record each order's value, incremental material and outsourced service costs, and the standard hours required at whichever resource is currently constrained. Distinguish the PEB route including automatic SAW assembly from the conventional structural steel route. Test competing schedules against delivery commitments."
      ],
      [
        "Common mistake",
        "Ranking projects purely by gross margin per ton or assuming all tons consume equal welding, fabrication, crane and finishing capacity. When multiple resources bind, a single ratio is not a full optimization model."
      ],
      [
        "Executive action",
        "Compare three completed projects by contribution per ton and contribution per measured constraint hour. Identify whether your current quotation priority would change."
      ]
    ],
    "resource": {
      "title": "Throughput accounting",
      "creator": "ACCA Performance Management examining team",
      "format": "Technical article",
      "time": "Approximately 15–20 minutes",
      "url": "https://www.accaglobal.com/middle-east/en/student/exam-support-resources/fundamentals-exams-study-resources/f5/technical-articles/throughput-constraints1.html"
    }
  },
  {
    "slug": "profit-waterfall-project-margin-leakage",
    "date": "2026-10-19",
    "category": "Business Consulting",
    "title": "The Profit Waterfall: Where Your Project Margins Disappear",
    "intro": "Compare quotation economics with final realized project margin to identify avoidable commercial and operational losses.",
    "sections": [
      [
        "The principle",
        "A profit waterfall reconciles the profit anticipated at quotation with the profit realized at completion. It separates price concessions, unrecovered scope changes, cost overruns, rework, freight, and contractual deductions. Each variance must be counted once and assigned to its underlying cause."
      ],
      [
        "Worked example — illustrative",
        "A SAR 1,000,000 contract is estimated to cost SAR 820,000, leaving SAR 180,000 expected profit (18%). Then a SAR 30,000 price concession, SAR 18,000 unbilled additional steel, SAR 12,000 extra transport, SAR 20,000 welding rework and SAR 10,000 delay penalty reduce profit to SAR 90,000. Assuming concessions and penalty reduce net revenue, final revenue is SAR 960,000 and final costs are SAR 870,000: a 9.4% margin."
      ],
      [
        "Apply at HEXA Steel®",
        "Freeze an approved tender baseline at award, track committed and incurred costs, change requests, revised revenue and estimated cost to complete, then reconcile at closure. Use an estimate-at-completion forecast during execution: actual cost to date + estimated cost to complete. Show changes separately from avoidable execution variances."
      ],
      [
        "Common mistake",
        "Calculating actual project profitability only after final delivery. By then, missing variation approvals and continuing losses may be impossible to recover. Profit erosion is not automatically managerial failure: distinguish authorized scope changes from controllable loss."
      ],
      [
        "Executive action",
        "Take five closed projects and compare tender profit with final profit. Rank their largest variance categories by SAR and identify a preventive control for the largest recurring loss."
      ]
    ],
    "resource": {
      "title": "The power of pricing",
      "creator": "Michael V. Marn, Eric V. Roegner and Craig C. Zawada — McKinsey & Company",
      "format": "Article",
      "time": "Approximately 15–20 minutes",
      "url": "https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/the-power-of-pricing"
    }
  },
  {
    "slug": "hidden-factory-first-pass-yield-rework",
    "date": "2026-10-22",
    "category": "Manufacturing Excellence",
    "title": "The Hidden Factory: How Rework Steals Production Capacity",
    "intro": "Reveal the extra production system devoted to repairing earlier mistakes and its impact on scarce manufacturing hours.",
    "sections": [
      [
        "The principle",
        "The 'hidden factory' is capacity absorbed by correction, retesting and rework rather than first-time-right production. Rolled Throughput Yield (RTY) captures the likelihood that a unit passes its required sequence without defects or rework. A high final acceptance rate can conceal poor first-pass performance."
      ],
      [
        "Worked example — illustrative",
        "Suppose first-pass yields are 98% for cutting, 90% for fabrication, 92% for MIG welding and 96% for coating. Their product is about 77.9%, so approximately 78 out of 100 equivalent assemblies pass the whole route first time under the stated assumptions. If 22 assemblies each require two additional hours at SAR 85/hour of genuinely incremental cost, that is 44 hours and SAR 3,740. Actual work orders may have multiple defects or different repair times."
      ],
      [
        "Apply at HEXA Steel®",
        "Record repair reason, process, original work order, actual rework hours, consumables and accept/reject outcome. Analyze conventional structural steel and PEB separately; inspect weld repairs, fit-up corrections, grinding returns and recoating. Determine whether rework consumes the current constraint's hours."
      ],
      [
        "Common mistake",
        "Reporting only 99% final inspection acceptance. Products that needed repeated fit-up, welding repair or recoating may still pass final inspection while wasting productive time."
      ],
      [
        "Executive action",
        "Collect the last 30 days of welding, fabrication and coating rework hours. Find the top three recurrent causes and calculate recovered constraint-hours if they were eliminated."
      ]
    ],
    "resource": {
      "title": "Six Sigma Rolled Throughput Yield",
      "creator": "Spencer Graves, Quality Engineering / ASQ",
      "format": "Research article",
      "time": "Approximately 15–25 minutes",
      "url": "https://asq.org/quality-resources/articles/six-sigma-rolled-throughput-yield?id=2be8d7ffb4eb4ccda87c777ffac4e478"
    }
  },
  {
    "slug": "rapid-decision-rights-ceo-dependency",
    "date": "2026-10-25",
    "category": "Business Consulting",
    "title": "RAPID: How to Scale a Business Without Making Every Decision Yourself",
    "intro": "Remove executive approval bottlenecks by assigning clear decision roles, boundaries and accountability.",
    "sections": [
      [
        "The principle",
        "Delegating tasks without delegating decisions creates a management bottleneck. Bain's RAPID® framework assigns Recommend, Agree, Perform, Input and Decide roles to important recurring or cross-functional decisions. RAPID is not a sequence; it describes responsibilities. One identified 'D' should carry final decision authority for each decision."
      ],
      [
        "Worked example — illustrative",
        "A SAR 112,000 steel purchase is within a SAR 120,000 approved project budget, its specifications are approved and three suppliers were evaluated. Yet a three-day wait for CEO approval holds the order. Under a documented authority matrix, Procurement could recommend and execute, Engineering could advise, Finance could confirm required compliance, and the Procurement Manager could decide within limits. The CEO would retain exceptions and reserved matters."
      ],
      [
        "Apply at HEXA Steel®",
        "Build a decision-rights matrix for purchasing, overtime, technical deviations, customer discounts, change orders and priority conflicts. Specify financial thresholds, documentation, risk exceptions and one final decision-maker. Capture 'ready for decision' and 'decision completed' timestamps in OTS™."
      ],
      [
        "Common mistake",
        "Assuming an organizational chart or job description settles authority. Reporting lines show who reports to whom; they do not necessarily determine who can approve a time-critical purchase or resolve a cross-departmental issue. Avoid five-role bureaucracy for trivial tasks."
      ],
      [
        "Executive action",
        "Review the last ten CEO escalations. Retain decisions with genuinely material risk, delegate routine compliant decisions, and repair unclear authority rules. Measure avoidable decision latency."
      ]
    ],
    "resource": {
      "title": "The five steps to better decisions",
      "creator": "Bain & Company",
      "format": "Brief PDF",
      "time": "Approximately 6–10 minutes",
      "url": "https://media.bain.com/Images/BAIN_BRIEF_Decision_Insights_The_five_steps_to_better_decisions.pdf"
    }
  },
  {
    "slug": "kingmans-formula-utilization-variability-queues",
    "date": "2026-10-28",
    "category": "Manufacturing Excellence",
    "title": "The Utilization Trap: Why a Busy Factory Can Become Dangerously Slow",
    "intro": "Use queueing theory to explain why high utilization and variability increase waiting times nonlinearly.",
    "sections": [
      [
        "The principle",
        "Kingman's approximation estimates mean queue waiting for a stable single-server process: Wq ≈ [(Ca² + Cs²)/2] × [u/(1−u)] × average effective processing time. Ca and Cs are coefficients of variation of arrival and service times; u is utilization below 100%. The u/(1−u) factor grows sharply as utilization approaches one."
      ],
      [
        "Worked example — illustrative",
        "At 30 minutes mean processing time and 0.60 coefficients of variation for both arrivals and service, the variability factor is 0.36. Estimated waits are 32.4 minutes at 75% utilization, 61.2 at 85%, and 97.2 at 90%. At 90% utilization, reducing both coefficients to 0.30 reduces the estimated wait to 24.3 minutes. These results are approximations, not observed factory performance."
      ],
      [
        "Apply at HEXA Steel®",
        "Track arrival-ready times, start times, handling cycles, setup times and interruptions for a specific crane or constrained workstation. With two separated facilities, simultaneous forklift and overhead-crane requests can generate long queues even if average daily loading seems adequate. Analyze distinct assembly families independently."
      ],
      [
        "Common mistake",
        "Treating 100% loading as the universal optimum. Some protective capacity may be economically justified. Do not apply the single-server equation to a whole factory with multiple parallel cranes and interconnected routes without further modeling."
      ],
      [
        "Executive action",
        "Measure one crane's request-to-start waiting and service duration for five days. Establish whether delays result from insufficient capacity, batching, poor readiness or synchronized demand peaks."
      ]
    ],
    "resource": {
      "title": "Kingman’s Equation (VUT equation)",
      "creator": "Project Production Institute",
      "format": "Technical reference",
      "time": "Approximately 5 minutes",
      "url": "https://projectproduction.org/glossary/kingmans-equation-vut-equation/"
    }
  },
  {
    "slug": "difference-in-differences-consulting-roi",
    "date": "2026-10-31",
    "category": "Business Consulting",
    "title": "Proving Consulting ROI: Did Your Intervention Actually Improve Performance?",
    "intro": "Separate improvement observed after a consulting intervention from improvement caused by the intervention.",
    "sections": [
      [
        "The principle",
        "Difference-in-Differences compares the before/after change in a treatment group with the contemporaneous change in a comparable, untreated group. It can help estimate the incremental effect of process improvements, subject to credible comparison and parallel-trends assumptions. The outcome must be defined consistently before implementation."
      ],
      [
        "Worked example — illustrative",
        "A fabrication team using a new fit-up inspection process cuts rework hours per 100 tons from 80 to 45, an improvement of 35. A comparable team without the change improves from 70 to 60, or 10 hours. The estimated incremental reduction is 35−10 = 25 hours per 100 tons. If replicated on 200 comparable tons, that suggests 50 recovered hours. At genuinely avoidable overtime of SAR 90/hour, the potential cash effect is SAR 4,500."
      ],
      [
        "Apply through management improvement",
        "For any improvement initiative, document the original baseline, target metric, intervention date, comparison group or alternative counterfactual, and ongoing monitoring. Separate operational outcomes, avoided cash expenditure and additional profitable throughput. Do not treat all recovered salaried hours as cash savings."
      ],
      [
        "Common mistake",
        "Claiming every post-intervention gain as consulting value. Different production mixes, seasonal demand, learning effects or unrelated investments may explain part of the change. Difference-in-Differences is weak if the groups were not plausibly following parallel trends."
      ],
      [
        "Executive action",
        "For your next controlled process change, choose a defensible comparison group before rollout and establish how Finance will validate any claimed economic benefit."
      ]
    ],
    "resource": {
      "title": "What Are We Estimating When We Estimate Difference-in-Differences?",
      "creator": "Pamela Jakiela, World Bank",
      "format": "Research article",
      "time": "Approximately 10–15 minutes",
      "url": "https://blogs.worldbank.org/en/impactevaluations/what-are-we-estimating-when-we-estimate-difference-differences"
    }
  },
  {
    "slug": "drum-buffer-rope-production-flow",
    "date": "2026-11-03",
    "category": "Manufacturing Excellence",
    "title": "Drum-Buffer-Rope: How to Stop Production Delays Before They Happen",
    "intro": "Synchronize upstream releases with the production constraint rather than maximizing every department's independent output.",
    "sections": [
      [
        "The principle",
        "Drum-Buffer-Rope (DBR) uses a constrained workstation's realistic schedule as the drum, a time or ready-work buffer to protect it, and a release signal—the rope—to limit premature work entering production. DBR protects flow and manages WIP; it does not magically raise installed machine capacity."
      ],
      [
        "Worked example — illustrative",
        "Suppose cutting can process 25 tons/day, fabrication 18, MIG welding 12, finishing 16 and coating 20 on one defined route. If every operation is ready and welding is the sole constraint, the route ceiling is 12 tons/day. Cutting 25 tons/day for five days creates 125 tons of cut work while welding can complete at most 60 tons. Controlled release should follow the welding schedule while allowing enough upstream lead time and buffer to prevent starvation."
      ],
      [
        "Apply at HEXA Steel®",
        "Start with one clear route. Schedule the verified constraint, ensure complete approved drawings and prepared assemblies reach it on time, then authorize cutting and fabrication releases against that need. Account for crane conflicts and movements between Factories 001 and 003. For complex mixes, size buffers in standard constraint-hours rather than just tons."
      ],
      [
        "Common mistake",
        "Interpreting DBR as making every workstation run at the same daily rate or holding no inventory. Upstream batches and protective buffers still matter; the aim is controlled flow, not zero WIP."
      ],
      [
        "Executive action",
        "At the current constraint, record idle hours caused by missing material, drawings, inspection clearance or handling. Assign one corrective action to the largest recurring source of starvation."
      ]
    ],
    "resource": {
      "title": "Implementing Drum-Buffer-Rope in your production planning",
      "creator": "Business Development Bank of Canada (BDC)",
      "format": "Article",
      "time": "6 minutes",
      "url": "https://www.bdc.ca/en/articles-tools/operations/operational-efficiency/production-planning-drum-buffer-rope"
    }
  },
  {
    "slug": "cost-of-delay-economic-project-sequencing",
    "date": "2026-11-06",
    "category": "Business Consulting",
    "title": "The Cost of Delay: How to Prioritize Projects by Economic Impact",
    "intro": "When scarce production hours compete, evaluate the economic consequence of postponement—not only which client is loudest.",
    "sections": [
      [
        "The principle",
        "Cost of Delay estimates the economic impact of postponing a project or milestone: penalties, incremental overhead, financing exposure and defensible lost opportunity contribution. When daily delay costs are constant, all jobs are immediately available and one resource is constrained, sequencing by delay cost divided by required processing time can minimize weighted completion costs. Real projects often violate these assumptions."
      ],
      [
        "Worked example — illustrative",
        "Three jobs need 100, 200 and 80 constraint hours, with delay costs SAR 4,000, 6,000 and 3,000 per day. Their relative priority indices are 40, 30 and 37.5 SAR per required hour, so A–C–B ranks ahead of B–A–C. At eight constraint hours/day, the former creates SAR 402,500 in modeled weighted completion costs versus SAR 442,500 for the latter: SAR 40,000 difference under the simplified assumptions."
      ],
      [
        "Apply at HEXA Steel®",
        "In PRM reviews, distinguish contractual completion dates, forecast milestones, remaining constraint-hours, actual daily financial exposure and critical technical dependencies. Model thresholds and retention releases explicitly: delay costs often jump at a contractual deadline instead of remaining constant. Never override binding obligations without commercial and legal review."
      ],
      [
        "Common mistake",
        "Prioritizing whichever project is most overdue or whoever escalated to the CEO last. Equally, a ratio alone is not enough for multi-resource projects, precedence networks, partial deliveries or changing delay penalties."
      ],
      [
        "Executive action",
        "For the three projects with the most schedule exposure, ask Planning, Production, Contracts and Finance to quantify remaining constraint-hours and credible economic delay exposure; evaluate one alternative feasible sequence."
      ]
    ],
    "resource": {
      "title": "The Principles of Product Development Flow: Second Generation Lean Product Development",
      "creator": "Donald G. Reinertsen, Celeritas Publishing",
      "format": "Book",
      "time": "Approximately 8–12 hours",
      "url": "https://celeritaspublishing.com/books/"
    }
  }
];
