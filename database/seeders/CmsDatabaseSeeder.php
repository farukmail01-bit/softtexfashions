<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Page;
use App\Models\SiteSetting;

class CmsDatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Ensure Admin User
        User::updateOrCreate(
            ['email' => 'admin@softtexfashions.com'],
            [
                'name' => 'Softtex Admin',
                'password' => Hash::make('softtex2026'),
            ]
        );

        // 2. Global Site Settings
        $settings = [
            'site_name' => 'SOFTTEX FASHIONS WEAR LIMITED',
            'site_subtitle' => '100% Export-Oriented Garments Manufacturer & Buying House - Quality Our Commitment',
            'contact_phone' => '+880 1904 464294',
            'contact_tel' => '01612 844020',
            'contact_email' => 'info@softtexfashions.com',
            'contact_whatsapp' => '+880 1904 464294',
            'contact_address' => 'House # 53/55(3A floor), Road # 20, Nikunja-2, Khilkhet, Dhaka -1229, Bangladesh.',
            'corporate_address' => 'House # 53/55(3A floor), Road # 20, Nikunja-2, Khilkhet, Dhaka -1229, Bangladesh.',
            'moq_info' => '300 Pieces per style and colour; 100 pieces per size',
            'lead_time_sample' => 'At cost plus courier; refunded with regular order',
            'lead_time_production' => '20 - 45 Days',
            'counter_categories' => '100+',
            'counter_experience' => '5+',
            'counter_units' => '230+',
            'counter_countries' => '17+',
        ];

        foreach ($settings as $key => $val) {
            SiteSetting::set($key, $val);
        }

        // 3. Pre-populate all standard pages with rich 100% dynamic sections

        // ==========================================
        // 1. HOME PAGE
        // ==========================================
        $homeSections = [
            'hero_slides' => [
                [
                    'title' => 'Manufacturer & exporter of',
                    'subtitle' => 'All kinds of apparel & readymade garments goods (knitwear, denim, woven items) for Men, Women, Kids.',
                    'bg_class' => 'slider_img_one',
                    'image' => ''
                ],
                [
                    'title' => 'Fashion is an art form & SOFTTEX FASHIONS WEAR LIMITED is the innovative art-hub.',
                    'subtitle' => 'Pioneering sustainable textile supply chain from Dhaka to global retail shelves.',
                    'bg_class' => 'slider_img_two',
                    'image' => ''
                ],
                [
                    'title' => 'Quality assurance | Lead timing | Fair Trade',
                    'subtitle' => 'Strict AQL 1.5 inspection standards with verified social and ethical compliance.',
                    'bg_class' => 'slider_img_three',
                    'image' => ''
                ],
                [
                    'title' => 'Global Garments Sourcing Partner',
                    'subtitle' => 'Your trusted buying bridge with 30+ top composite manufactories in Bangladesh.',
                    'bg_class' => 'slider_img_four',
                    'image' => ''
                ]
            ],
            'about_section' => [
                'title' => 'Who we are?',
                'paragraphs' => [
                    'Softtex Fashions Wear Ltd. started their apparel buying & sourcing operations since 2018 in South Asia-Bangladesh & operating their work as buying bridge between buyers/importer & manufacturer/ Exporter for readymade all kinds of garments product . We have a strong co-relation with Bangladeshi renowned garments manufacturer where we do the production of our buyers products by strict order follow up with keeping quality assurances and standard inspections as well as on time deliveries .',
                    'We have been set up global merchandise team to provide sourcing services to buyer across the global market for finished apparels and textiles as well as ready made garments stock lot from Bangladesh. our mission has been strive for the greatest possible satisfactions & mutual benefits for our customers & manufacturer as we concentrate on quality, on–time delivery and the best possible value for money at all times.',
                    'A combination of competitive prices, good quality and on time delivery is our main strength. Our services included -Product development, Supplier sourcing, Production Planning & follow-up, Merchandising, Monitoring all kinds of supply chain , Factory audits , Quality assurance etc .'
                ],
                'image' => 'static/media/about_bg_img.6b58bb76aba9d2a5587f.jpg'
            ],
            'certifications_heading' => 'Our assigned manufactories are approved for these global certifications/standards',
            'cert_logos' => [
                ['name' => 'ACCORD', 'img' => 'images/certificatelogos/accord-logo.png'],
                ['name' => 'BSCI', 'img' => 'images/certificatelogos/bsci-logo.png'],
                ['name' => 'OEKO-TEX', 'img' => 'images/certificatelogos/cit-logo.png'],
                ['name' => 'CTPAT', 'img' => 'images/certificatelogos/ctpat.jpg'],
                ['name' => 'GOTS', 'img' => 'images/certificatelogos/gots-log.png'],
                ['name' => 'OCS', 'img' => 'images/certificatelogos/ocs-logo.jpg'],
                ['name' => 'RCS', 'img' => 'images/certificatelogos/rcs-logo.jpg'],
                ['name' => 'SEDEX', 'img' => 'images/certificatelogos/sedex-logo.png'],
                ['name' => 'SGS', 'img' => 'images/certificatelogos/sgs-logo.png'],
                ['name' => 'WRAP', 'img' => 'images/certificatelogos/wrap-logo.png'],
            ],
            'creative_section' => [
                'title' => 'We do creative & Trendy fashion clothing',
                'subtitle' => 'Clothing Manufacturer Providing healthy services over years,we manufacture & export Baby Clothes, Kids Clothes, Women’s Clothing, Men\'s Clothing, T-Shirt, Polo Shirts, Hoodies, Sweatshirts, Pant, Shorts, Skirts, Dresses, Sportswear, School Uniforms, Sports Uniforms, Corporate Uniforms & Custom Clothing.',
                'features' => [
                    'Sampling lead-time in days',
                    'Production Lead time (Its depends on the styling, quantity)',
                    'MOQ Pieces(Per Style, Colour, Design)',
                    'Percent Satisfaction'
                ]
            ],
            'counter_section' => [
                'title' => 'BUSINESS WE DEALT SO FAR',
                'counters' => [
                    ['value' => '100+', 'title' => 'Catagories', 'subtitle' => 'Available'],
                    ['value' => '5+', 'title' => 'Years', 'subtitle' => 'Of Experience'],
                    ['value' => '230+', 'title' => 'Assigned', 'subtitle' => 'Manufacturing Units'],
                    ['value' => '17+', 'title' => 'Associated', 'subtitle' => 'Countries']
                ]
            ],
            'clients_heading' => 'OUR CLIENTS, BRANDS, CUSTOMERS- AROUND THE WORLD',
            'buyer_logos' => [
                ['name' => 'Eddie Bauer', 'img' => 'images/buyer/eddies-bauer.png'],
                ['name' => 'Emart', 'img' => 'images/buyer/emart.png'],
                ['name' => 'Forever 21', 'img' => 'images/buyer/forever-21.jpg'],
                ['name' => 'Guess', 'img' => 'images/buyer/guess.png'],
                ['name' => 'Hard Rock', 'img' => 'images/buyer/hard-rock.png'],
                ['name' => 'Head', 'img' => 'images/buyer/head.png'],
                ['name' => 'Home Plus', 'img' => 'images/buyer/home-plus.jpg'],
                ['name' => 'Joyrich', 'img' => 'images/buyer/joy-rich.jpg'],
                ['name' => 'Keith Haring', 'img' => 'images/buyer/keith-haring.jpg'],
                ['name' => 'Rich Cotton', 'img' => 'images/buyer/rich-cotton.jpg'],
                ['name' => 'Skechers', 'img' => 'images/buyer/skechers.jpg'],
                ['name' => 'US Polo', 'img' => 'images/buyer/us-polo.jpg']
            ]
        ];

        Page::updateOrCreate(['slug' => 'home'], [
            'title' => 'Home',
            'subtitle' => '100% Export-Oriented Garments Buying House',
            'hero_title' => 'A CREATIVE & TRENDY FASHION WEAR BUYING HOUSE',
            'content' => 'Softtex Fashions Wear Limited is a leading apparel sourcing and export company in Dhaka, Bangladesh.',
            'sections_data' => $homeSections,
            'meta_title' => 'SOFTTEX FASHIONS WEAR LIMITED | 100% Export-Oriented Garments Buying House Bangladesh',
            'meta_description' => 'SOFTTEX FASHIONS WEAR LIMITED is a premier apparel sourcing agency and garments buying house in Dhaka, Bangladesh. Certified by ACCORD, BSCI, OEKO-TEX, SEDEX & GOTS.',
            'meta_keywords' => 'garments buying house bangladesh, apparel sourcing agency dhaka, clothing manufacturer bangladesh, knitwear exporter',
            'status' => 'published',
        ]);

        // ==========================================
        // 2. COMPANY PROFILE
        // ==========================================
        $companyProfileSections = [
            'section_title' => 'Company Overview',
            'profile_items' => [
                ['label' => 'Company Name', 'value' => 'SOFTTEX FASHIONS WEAR LTD.'],
                ['label' => 'Type of Company', 'value' => 'Private Limited Company'],
                ['label' => 'Activities of the company', 'value' => 'Trading House/ Buying House /Exporter & Importer.'],
                ['label' => 'Legitimacy of the company', 'value' => 'Registered By Joint Stock Corporation, Dhaka City Corporation, Bangladesh Garments Manufacturer Exporter Association (BGMEA), Bangladesh Garments Buying House Association (BGBA), Bangladesh Textile & Mills Corporation (BTMC).'],
                ['label' => 'Legal Identity', 'value' => 'SOFTTEX FASHIONS WEAR LTD.'],
                ['label' => 'Trade License No', 'value' => 'TRAD/DNCC/041460/2022'],
                ['label' => 'Group CEO', 'value' => 'Muhammad Bashir Uddin'],
                ['label' => 'Employee & Management', 'value' => '25+ Specialists & QA Engineers.'],
                ['label' => 'Yearly Turnover', 'value' => '20 MILLION USD.'],
                ['label' => 'Establishment', 'value' => '2018 , Dhaka , Bangladesh.'],
                ['label' => 'Products', 'value' => 'SOFTTEX FASHIONS WEAR LTD. is exporting all kinds of products for men, women and kids. Product range: T-Shirts (Long sleeve, short sleeve), Polo Shirts (Long sleeve, short sleeve), Tank Tops, Sweat Shirts, Jogging Suits, Skirts, Trousers, Shorts, Shirts, Pants, Underwear and sweater.'],
                ['label' => 'Capacity', 'value' => 'Knit 60-90 days after confirmation woven 90-120 days after confirmation Sweater 120-130 days after confirmation. For repeat orders, we need 45 days lead time or it is negotiable during order placement time.'],
                ['label' => 'Production Facility', 'value' => 'Associated with 30 full-complianced export oriented manufactories in Bangladesh.'],
                ['label' => 'Production follow up', 'value' => 'We have a strong setup to execute orders properly, ensuring on-time delivery with premier quality. Production is followed-up daily by our qualified team of Merchandisers who carefully take care of the status of raw materials, accessories, knitting, dyeing, and sewing. Quality teams follow up production on factory floors to ensure quality and communicate with merchandising continuously.']
            ]
        ];

        Page::updateOrCreate(['slug' => 'company-profile'], [
            'title' => 'Company Profile',
            'subtitle' => '100% Export-Oriented Garments Buying House',
            'hero_title' => 'Company Overview',
            'content' => 'SOFTTEX FASHIONS WEAR LIMITED is an elite export-oriented apparel buying house and supply chain management agency established in Dhaka, Bangladesh.',
            'sections_data' => $companyProfileSections,
            'meta_title' => 'Company Profile | SOFTTEX FASHIONS WEAR LIMITED',
            'meta_description' => 'Read the corporate profile, manufacturing capacity, export statistics, and management integrity of Softtex Fashions Wear Ltd.',
            'meta_keywords' => 'company profile softtex fashions, bangladesh buying house profile, garments export capacity',
            'status' => 'published',
        ]);

        // ==========================================
        // 3. VISION & MISSION
        // ==========================================
        $visionSections = [
            'hero_title' => 'Vision and Mission',
            'vision_title' => 'Vision',
            'vision_text' => 'Our vision is simple but bold we aspire to maintain the image of the brands to help our customers navigate their own distinct identity, styles and continuous strategic planning for better productions.',
            'mission_title' => 'Mission',
            'mission_points' => [
                'To strive hard to be a trading house of world class textile & garments products as well as service while positioning the country in the higher value segment of the international textile market.',
                'Our Relentless endeavor is contributing to enhancing the country’s position as an international provider of quality products.',
                'To satisfy customers through technology and synergic synchronization of man and machine , tailoring quality products and services to harvest the reward of responsibility.',
                'To Create a better future for the stakeholders, maintaining high standards of integrity, propriety and goodwill in shouldering social responsibilities.'
            ]
        ];

        Page::updateOrCreate(['slug' => 'vision'], [
            'title' => 'Vision & Mission',
            'subtitle' => 'Ethical, Sustainable & Transparent Sourcing',
            'hero_title' => 'Vision and Mission',
            'content' => 'To be the most trusted and reliable apparel sourcing bridge between global buyers and Bangladeshi factories.',
            'sections_data' => $visionSections,
            'meta_title' => 'Our Vision & Mission | SOFTTEX FASHIONS WEAR LIMITED',
            'meta_description' => 'Our corporate mission is to provide global apparel buyers with transparent sourcing, sustainable manufacturing, and zero-defect quality.',
            'meta_keywords' => 'garments buying house vision, sustainable apparel sourcing',
            'status' => 'published',
        ]);

        // ==========================================
        // 4. MANAGEMENT & PARTNERS
        // ==========================================
        $managementPartners = [
            [
                'name' => 'Josna',
                'role' => 'Chairman (Founder)',
                'department' => 'Founding Board',
                'avatar' => 'JS',
                'badge' => 'Founder & Board',
                'bio' => 'Strategic guidance, corporate ethics, and long-term organizational governance ensuring Softtex adheres to world-class manufacturing standards.',
                'highlight' => 'Corporate Governance & Ethical Compliance'
            ],
            [
                'name' => 'Rakib',
                'role' => 'Managing Director (Founder)',
                'department' => 'Executive Leadership',
                'avatar' => 'RK',
                'badge' => 'Founder & Executive',
                'bio' => 'Overall corporate execution, factory partnership network across Bangladesh, supply chain excellence, and high-volume apparel manufacturing.',
                'highlight' => 'Factory Operations & Global Supply Chain'
            ],
            [
                'name' => 'Rana',
                'role' => 'Marketing Director (Head of Marketing)',
                'department' => 'Commercial Leadership',
                'avatar' => 'RN',
                'badge' => 'Head of Marketing',
                'bio' => 'Leading international brand acquisitions, FOB price competitiveness, buyer relationship management across Europe and North America.',
                'highlight' => 'Global Brand Acquisition & Buyer Relations'
            ],
            [
                'name' => 'Jannatul Ferdous Happy',
                'role' => 'Co-Marketing Director',
                'department' => 'Marketing & Merchandising',
                'avatar' => 'JH',
                'badge' => 'Marketing Leadership',
                'bio' => 'Overseeing merchandising coordination, rapid sample approval cycles, buyer communication, and trend-focused apparel lines.',
                'highlight' => 'Merchandising Operations & Sampling'
            ],
            [
                'name' => 'Yusuf',
                'role' => 'Business Development Executive',
                'department' => 'Business Growth',
                'avatar' => 'YS',
                'badge' => 'Business Development',
                'bio' => 'Market intelligence, tech-pack costing analysis, new buyer onboarding, and cultivating long-term relationships with global apparel retailers.',
                'highlight' => 'Strategic Sourcing & New Market Growth'
            ]
        ];

        Page::updateOrCreate(['slug' => 'management'], [
            'title' => 'Our Partners & Management',
            'subtitle' => 'Visionary Leadership & Apparel Excellence',
            'hero_title' => 'Our Partners & Management',
            'content' => 'The visionary founders and dedicated leadership team steering Softtex Fashions Wear Limited toward sustainable manufacturing and global apparel excellence.',
            'sections_data' => [
                'page_title' => 'Our Partners & Management',
                'page_eyebrow' => 'Leadership & Governance',
                'page_lead' => 'The visionary founders and dedicated leadership team steering Softtex Fashions Wear Limited toward sustainable manufacturing and global apparel excellence.',
                'partners' => $managementPartners
            ],
            'meta_title' => 'Our Partners & Management | SOFTTEX FASHIONS WEAR LIMITED',
            'meta_description' => 'Meet the executive leadership and partners of Softtex Fashions Wear Limited: Chairman Josna, Managing Director Rakib, Marketing Director Rana, Co-Marketing Director Jannatul Ferdous Happy, and Business Development Executive Yusuf.',
            'meta_keywords' => 'softtex fashions partners, garments buying house directors, rakib managing director, josna chairman, rana marketing director',
            'status' => 'published',
        ]);

        // ==========================================
        // 5. SERVICES
        // ==========================================
        $servicesAccordion = [
            [
                'id' => 1,
                'title' => 'Sourcing',
                'paragraphs' => [
                    'We have more vast experience in Asia under our belt , during this period we have developed real partnerships with our South-Asian vendor networks-',
                    'As a service company pure and simple , we are flexible enough to look continuously for the best suppliers – throughout the Asian region.'
                ],
                'bullets' => [
                    'We have worked with some of our vendors for more than 3-4 years , we regard them as the backbone of our business.',
                    'Since buying streams are changing constantly , our product manager work non-stop to open up new and promising sources .'
                ]
            ],
            [
                'id' => 2,
                'title' => 'Product Development',
                'paragraphs' => [
                    'Price is only one aspect of competition , increasingly , differentiation and creativity are providing to be major advantages for our customer base . In cooperation with our vendors , we carve ourselves a distinctive position with new & unique products-'
                ],
                'bullets' => [
                    'We cooperate with independent , innovative product designers in the fields of high-end goods and textiles for enhancing our creative knowledges, up-to-date fashion trends.',
                    'We have the advantages of knowing what the market needs and can transfer that knowledge from the most creative market.'
                ]
            ],
            [
                'id' => 3,
                'title' => 'Merchandising',
                'paragraphs' => [
                    'Our day-to-day communication with customers and suppliers gives us a profound understanding of what our customers demand -'
                ],
                'bullets' => [
                    'Our skilled specialists monitor and guide sampling and production process.',
                    'Our specialist staff monitor the safety aspects or our product.',
                    'Technical, functional support in sampling & pattern.',
                    'Research & Development for stepping forward.'
                ]
            ],
            [
                'id' => 4,
                'title' => 'Manufactory Selection & Evaluation',
                'paragraphs' => [
                    'We believe in \'\'Right place for right operations\'\' and for that we researching for the accurate manufactories for accurate order in terms of that we consider line setup, pros & cons & other derivatives for efficient output.'
                ],
                'bullets' => []
            ],
            [
                'id' => 5,
                'title' => 'Quality',
                'paragraphs' => [
                    'Quality is the key to our business as we understand it . It encompasses communication and service quality as well as product planning and product quality assurance . There are several measures that we implement to guarantee high-quality products -'
                ],
                'bullets' => [
                    'Initial production check',
                    'During production check',
                    'Final random inspection',
                    'Loading supervision',
                    'AQL-General explanation.'
                ]
            ],
            [
                'id' => 6,
                'title' => 'Production Planning & TNA',
                'paragraphs' => [],
                'bullets' => [
                    'We plan and propose suppliers timeframes to customers.',
                    'We properly maintain lead time & in-housing, action planning of raw materials, sewing materials, fabrics, finishing accessories.',
                    'Our team maintain buyer\'s delivery schedule, deadline by following TNA along with factories.'
                ]
            ],
            [
                'id' => 7,
                'title' => 'Logistics Support & co-operation',
                'paragraphs' => [],
                'bullets' => [
                    'We plan and prepare all kinds of shipping derivatives, global logistics supports according to buyer requirements.',
                    'Partially, we are too much concerned about negotiating, find out competitive shipping prices for global shipping.',
                    'Our specific logistics team monitoring, controlling products ETA, EDA based on shipping line weekly vessel schedules.'
                ]
            ],
            [
                'id' => 8,
                'title' => 'SOFTTEX FASHIONS WEAR LTD. Working Procedures',
                'paragraphs' => [
                    'Factory Audit – Prerequisite for Successful Sourcing SOFTTEX FASHIONS WEAR LTD. WORKING PROCEDURES Selecting the right vendor is one of the most important preconditions for successful sourcing. Factory audit helps to verify a manufacturers ability to comply with contractual terms in respect of quality , quantity and delivery .'
                ],
                'bullets' => [
                    'Increase confidence that the manufacturer can do better service.',
                    'Requirements regarding quality , quantity and terms of delivery.',
                    'Reduction in import risks.',
                    'No need for customer on-site presence.'
                ]
            ],
        ];

        Page::updateOrCreate(['slug' => 'services'], [
            'title' => 'Our Services',
            'subtitle' => 'Comprehensive Apparel Sourcing, Production & QA Solutions',
            'hero_title' => 'Our Services',
            'content' => 'SOFTTEX FASHIONS WEAR LTD. is committed to provide you best customer service and guaranteed for the best quality products at a very competitive price. Our comprehensive services are not only limited to the best sourcing house, buying arrangement, meeting with best manufacturer in the industry, sample development, sample approval, production quality control and timely shipment but also we take more ownership and responsibilities on our shoulders on your behalf in order to make sure risks are minimized and quality of products are not compromised.',
            'sections_data' => [
                'side_image' => 'static/media/services.d158d48b62ad2677656a.png',
                'accordion_title' => 'Key Functions',
                'accordion_items' => $servicesAccordion
            ],
            'meta_title' => 'Our Services | Sourcing, Development & QA | SOFTTEX FASHIONS',
            'meta_description' => 'End-to-end garments buying services: product development, factory audits, critical path merchandising, in-line QA inspection, and export logistics.',
            'meta_keywords' => 'garments buying services, apparel merchandising bangladesh, fabric development, garment quality assurance',
            'status' => 'published',
        ]);

        // ==========================================
        // 6. QUALITY ASSURANCE
        // ==========================================
        $qualityAccordion = [
            [
                'id' => 1,
                'title' => 'Quality Management:',
                'paragraphs' => [
                    'The act of overseeing all activities and tasks needed to maintain a desired level of excellence.',
                    'This includes creating and implementing quality planning and assurance, as well as quality control and quality improvement.'
                ],
                'bullets' => []
            ],
            [
                'id' => 2,
                'title' => 'Quality Management Components:',
                'paragraphs' => [
                    'Quality management consists of four key components: quality planning, quality assurance, quality control and quality improvement.'
                ],
                'bullets' => []
            ],
            [
                'id' => 3,
                'title' => 'Components of Softtex quality management are described below:',
                'paragraphs' => [
                    'Quality Planning - Criteria Driven: Identifies standards and determines procedures.',
                    'Quality Assurance - Prevention Driven: Planned and systematic quality activities ensuring buyer confidence.',
                    'Quality Control - Inspection Driven: Statistical Process Control (SPC) for monitoring processes.'
                ],
                'bullets' => []
            ],
            [
                'id' => 4,
                'title' => 'Dimensions of Quality:',
                'paragraphs' => [],
                'bullets' => [
                    '1. Performance',
                    '2. Durability',
                    '3. Aesthetics',
                    '4. Features',
                    '5. Serviceability',
                    '6. Conformance',
                    '7. Reliability',
                    '8. Perceived quality'
                ]
            ],
            [
                'id' => 5,
                'title' => 'Acceptable Quality Level (AQL) 1.5 / 2.5 Inspection Standard:',
                'paragraphs' => [
                    'AQL is the internationally adopted method of determining delivery quality by checking a percentage of total quantity. Softtex strictly enforces AQL 1.5 Major and 2.5 Minor levels.'
                ],
                'bullets' => []
            ]
        ];

        Page::updateOrCreate(['slug' => 'quality'], [
            'title' => 'Quality Assurance',
            'subtitle' => 'International AQL 1.5 / 2.5 Zero-Defect Quality Control',
            'hero_title' => 'QUALITY ASSURANCE',
            'content' => 'Quality is all the features in the product to meet customer requirements. Quality is a multifaceted concept that describes how well a service, process, material, or product possesses desired intangible or physical attributes. SOFTTEX FASHIONS WEAR LTD. is highly concerned about key operations for well-organized, planned QC inspections at every step of RMG goods production.',
            'sections_data' => [
                'side_image' => 'static/media/quality_bg.b3548ae53d9b0cbd74a8.png',
                'accordion_title' => 'Quality Protocols & Dimensions',
                'accordion_items' => $qualityAccordion
            ],
            'meta_title' => 'Quality Assurance & AQL Standards | SOFTTEX FASHIONS',
            'meta_description' => 'Zero-defect quality commitment: 4-point fabric inspection, inline quality audits, and AQL 1.5 / 2.5 final random inspections.',
            'meta_keywords' => 'garments quality assurance, aql 1.5 inspection bangladesh, textile lab testing, pre shipment inspection',
            'status' => 'published',
        ]);

        // ==========================================
        // 7. COMPLIANCE & STANDARDS
        // ==========================================
        $complianceSections = [
            'hero_title' => 'COMPLIANCE & ETHICS',
            'side_image' => 'static/media/compliance.60e4fbca700a75ba099f.png',
            'intro_heading' => 'Social Compliance',
            'intro_text' => 'SOFTTEX FASHIONS WEAR LTD. is one of the leading multinational readymade apparel sourcing and manufacturing companies in Bangladesh with a reputation for quality, reliability, and unparalleled customer service. By owning vertically-integrated world-class sourcing and developing expertise in every step of the process we uncover efficiencies and resource savings most cannot see.',
            'intro_bullets' => [
                'To uphold the reputation of our Customers, Business Partners & our organization by ensuring ethics, integrity and technical expertise are uncompromisingly practiced in our audit processes.',
                'To enlist the factory our compliance team first visits the factory for the social compliance audit, if the audit pass then we go for order placement. In this regard, we follow the buyers’ Code of conduct and Local Law.',
                'We are monitoring compliance issues with all our enlisted suppliers on regular basis announced and unannounced.'
            ],
            'ztv_title' => 'ZERO TOLERANCE POLICY',
            'ztv_subtitle' => 'Compliance Issues to be categorized as ZTV',
            'ztv_items' => [
                'Child labor',
                'Forced labor in any form overt or covert & Modern Day Slavery',
                'Discrimination in any form',
                'Harassment and Abuse',
                'Unauthorized subcontracting including Tier 2 operations regardless of brands',
                'Failure to provide access to records or workers’ interviews',
                'Shared building unless approved by Head of Compliance',
                'Factory building approved for residential purposes',
                'Any unethical practice, such as bribery in any form.'
            ],
            'certificates_title' => 'SOFTTEX FASHIONS WEAR LTD. is associated with 25-30 export-oriented as well as social and environmental compliance-certified manufactories. Certified by global testing approvals:',
            'cert_logos' => $homeSections['cert_logos']
        ];

        Page::updateOrCreate(['slug' => 'compliance'], [
            'title' => 'Compliance & Standards',
            'subtitle' => 'Social, Environmental & Structural Accreditations',
            'hero_title' => 'COMPLIANCE & ETHICS',
            'content' => 'Our partnered factories comply with ACCORD, BSCI, SEDEX, OEKO-TEX, and GOTS standards.',
            'sections_data' => $complianceSections,
            'meta_title' => 'Global Compliance & Factory Standards | SOFTTEX FASHIONS',
            'meta_description' => 'Our partner factories are certified by ACCORD, BSCI, SEDEX, OEKO-TEX, GOTS, WRAP, and CTPAT. Ethical manufacturing guaranteed.',
            'meta_keywords' => 'bsci certified garments bangladesh, accord audited factories',
            'status' => 'published',
        ]);

        // ==========================================
        // 8. CONTACT US
        // ==========================================
        $contactSections = [
            'office_title' => 'Office ADDRESS',
            'office_address' => "House # 53/55(3A floor), Road # 20,\nNikunja-2, Khilkhet, Dhaka -1229, Bangladesh.",
            'office_phone' => '+880 1904 464294',
            'office_tel' => '01612 844020',
            'office_email' => 'info@softtexfashions.com',
            'office_website' => 'www.softtexfashions.com',
            'permanent_title' => 'Permanent Address',
            'permanent_address' => "House # 53/55(3A floor), Road # 20,\nNikunja-2, Khilkhet, Dhaka -1229, Bangladesh.",
            'permanent_phone' => '+880 1904 464294',
            'permanent_tel' => '01612 844020',
            'permanent_email' => 'info@softtexfashions.com',
            'permanent_website' => 'www.softtexfashions.com',
            'contact_persons' => [
                [
                    'title' => 'MANAGING DIRECTOR',
                    'name' => 'MUHAMMAD BASHIR UDDIN',
                    'phone' => '+880 1904 464294',
                    'email' => 'info@softtexfashions.com'
                ],
                [
                    'title' => 'CHAIRMAN',
                    'name' => 'MD. ROBIUL ALAM',
                    'phone' => '+8801973 483950',
                    'email' => 'robiul@softtexfashions.com'
                ]
            ]
        ];

        Page::updateOrCreate(['slug' => 'contact'], [
            'title' => 'Contact Us',
            'subtitle' => 'Reach Out for Rapid FOB Inquiries & Tech Pack Submissions',
            'hero_title' => 'Contact Us',
            'content' => 'Office: House # 53/55(3A floor), Road # 20, Nikunja-2, Khilkhet, Dhaka -1229, Bangladesh. Phone: +880 1904 464294, Tel: 01612 844020. Email: info@softtexfashions.com',
            'sections_data' => $contactSections,
            'meta_title' => 'Contact Us | SOFTTEX FASHIONS WEAR LIMITED | Dhaka, Bangladesh',
            'meta_description' => 'Get in touch with Softtex Fashions Wear Ltd. Head office: House # 53/55(3A floor), Road # 20, Nikunja-2, Khilkhet, Dhaka -1229. Phone: +880 1904 464294, Tel: 01612 844020. Email: info@softtexfashions.com',
            'meta_keywords' => 'contact softtex fashions, garments buying house phone number',
            'status' => 'published',
        ]);

        Page::updateOrCreate(['slug' => 'terms'], [
            'title' => 'Terms & Conditions',
            'subtitle' => 'Commercial Guidelines & Trade Commitments',
            'hero_title' => 'Terms & Conditions',
            'content' => 'Clear, transparent commercial principles governing apparel manufacturing, minimum order quantities, payment structures, quality control, and export logistics at Softtex Fashions Wear Limited.',
            'sections_data' => [
                'page_title' => 'Terms & Conditions',
                'page_eyebrow' => 'Commercial Governance & Trade Guidelines',
                'highlights' => [
                    ['title' => 'Payment Structure', 'description' => '50% advance deposit by T/T or Irrevocable L/C to start production; 50% balance before bill of lading and shipment dispatch.'],
                    ['title' => 'Standard Production MOQ', 'description' => '300 pieces per style / colorway (100 pcs per size). Small boutique runs (50-100 pcs) accepted on customized pricing.'],
                    ['title' => 'Sample Approvals & Tech Pack', 'description' => 'Tech Pack required. Samples provided at cost + courier, 100% refunded with bulk order. Subsequent samples free for ongoing buyers.'],
                    ['title' => 'Lead Times & Tracking', 'description' => '20-45 business days ex-factory bulk delivery. Dedicated daily Time & Action (T&A) milestones and inspection reporting.'],
                ],
            ],
            'meta_title' => 'Terms & Conditions | SOFTTEX FASHIONS WEAR LIMITED',
            'meta_description' => 'Commercial terms, payment methods, minimum order quantities (MOQ), sample approvals, delivery schedules, and export trade guidelines of Softtex Fashions Wear Ltd.',
            'meta_keywords' => 'softtex terms conditions, apparel export payment terms, garment moq bangladesh',
            'status' => 'published',
        ]);

        // 4. Pre-populate Gallery Items
        $gallerySeeds = [
            // US Polo (9 items)
            ['client_slug' => 'us-polo', 'title' => 'Classic Heritage Pique Polo', 'category' => 'Polo Shirts', 'gsm' => '220 GSM', 'moq' => '1,000 Pcs', 'image_url' => 'images/uspolo/1.jpg', 'order' => 1],
            ['client_slug' => 'us-polo', 'title' => 'Slim Fit Compact Cotton Polo', 'category' => 'Polo Shirts', 'gsm' => '210 GSM', 'moq' => '1,000 Pcs', 'image_url' => 'images/uspolo/2.jpg', 'order' => 2],
            ['client_slug' => 'us-polo', 'title' => 'Tipped Collar Mercerized Polo', 'category' => 'Polo Shirts', 'gsm' => '230 GSM', 'moq' => '1,200 Pcs', 'image_url' => 'images/uspolo/3.jpg', 'order' => 3],
            ['client_slug' => 'us-polo', 'title' => 'Long Sleeve Jersey Polo', 'category' => 'Polo Shirts', 'gsm' => '200 GSM', 'moq' => '1,000 Pcs', 'image_url' => 'images/uspolo/4.jpg', 'order' => 4],
            ['client_slug' => 'us-polo', 'title' => 'Stripe Yarn-Dyed Polo', 'category' => 'Polo Shirts', 'gsm' => '215 GSM', 'moq' => '1,500 Pcs', 'image_url' => 'images/uspolo/5.jpg', 'order' => 5],
            ['client_slug' => 'us-polo', 'title' => 'Pima Cotton Luxury Polo', 'category' => 'Polo Shirts', 'gsm' => '220 GSM', 'moq' => '800 Pcs', 'image_url' => 'images/uspolo/6.jpg', 'order' => 6],
            ['client_slug' => 'us-polo', 'title' => 'Sport Performance Dry-Fit Polo', 'category' => 'Performance', 'gsm' => '180 GSM', 'moq' => '1,500 Pcs', 'image_url' => 'images/uspolo/7.jpg', 'order' => 7],
            ['client_slug' => 'us-polo', 'title' => 'Embroidered Crest Club Polo', 'category' => 'Polo Shirts', 'gsm' => '230 GSM', 'moq' => '1,000 Pcs', 'image_url' => 'images/uspolo/8.jpg', 'order' => 8],
            ['client_slug' => 'us-polo', 'title' => 'Vintage Garment Dyed Polo', 'category' => 'Polo Shirts', 'gsm' => '210 GSM', 'moq' => '1,000 Pcs', 'image_url' => 'images/uspolo/9.jpg', 'order' => 9],

            // Rich Cotton (4 items)
            ['client_slug' => 'rich-cotton', 'title' => '100% Organic Heavyweight Tee', 'category' => 'T-Shirts', 'gsm' => '240 GSM', 'moq' => '1,000 Pcs', 'image_url' => 'images/richcotton/1.jpg', 'order' => 1],
            ['client_slug' => 'rich-cotton', 'title' => 'Relaxed Fit Organic Cotton Tee', 'category' => 'T-Shirts', 'gsm' => '200 GSM', 'moq' => '1,000 Pcs', 'image_url' => 'images/richcotton/2.jpg', 'order' => 2],
            ['client_slug' => 'rich-cotton', 'title' => 'Bio-Washed Slub Cotton Tee', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,200 Pcs', 'image_url' => 'images/richcotton/3.jpg', 'order' => 3],
            ['client_slug' => 'rich-cotton', 'title' => 'French Terry Crewneck Sweatshirt', 'category' => 'Sweatshirts', 'gsm' => '320 GSM', 'moq' => '800 Pcs', 'image_url' => 'images/richcotton/4.jpg', 'order' => 4],

            // Mens Collection
            ['client_slug' => 'mens', 'title' => 'Heavyweight Loopback Fleece Hoodie', 'category' => 'Hoodies', 'gsm' => '340 GSM', 'moq' => '1,000 Pcs', 'image_url' => 'images/mens/1.jpg', 'order' => 1],
            ['client_slug' => 'mens', 'title' => 'Overdyed Relaxed Fit Cargo Pant', 'category' => 'Pants & Bottoms', 'gsm' => '280 GSM', 'moq' => '1,200 Pcs', 'image_url' => 'images/mens/2.jpg', 'order' => 2],
            ['client_slug' => 'mens', 'title' => 'Vintage Acid Washed Graphic Tee', 'category' => 'T-Shirts', 'gsm' => '220 GSM', 'moq' => '1,000 Pcs', 'image_url' => 'images/mens/3.jpg', 'order' => 3],
            ['client_slug' => 'mens', 'title' => 'Classic Cotton Twill Chino Trousers', 'category' => 'Trousers', 'gsm' => '260 GSM', 'moq' => '1,500 Pcs', 'image_url' => 'images/mens/4.jpg', 'order' => 4],
            ['client_slug' => 'mens', 'title' => 'Quarter-Zip Knit Pullover', 'category' => 'Knitwear', 'gsm' => '300 GSM', 'moq' => '800 Pcs', 'image_url' => 'images/mens/5.jpg', 'order' => 5],
            ['client_slug' => 'mens', 'title' => 'Heavy Weight Flannel Shirt', 'category' => 'Shirts', 'gsm' => '210 GSM', 'moq' => '1,000 Pcs', 'image_url' => 'images/mens/6.jpg', 'order' => 6],
            ['client_slug' => 'mens', 'title' => 'Denim Selvedge Styled Jacket', 'category' => 'Outerwear', 'gsm' => '12.5 OZ', 'moq' => '600 Pcs', 'image_url' => 'images/mens/7.jpg', 'order' => 7],
            ['client_slug' => 'mens', 'title' => 'Terry Cotton Drawstring Jogger', 'category' => 'Activewear', 'gsm' => '300 GSM', 'moq' => '1,000 Pcs', 'image_url' => 'images/mens/8.jpg', 'order' => 8],

            // Womens Collection
            ['client_slug' => 'womens', 'title' => 'Cropped Organic Cotton Pullover', 'category' => 'Sweatshirts', 'gsm' => '280 GSM', 'moq' => '800 Pcs', 'image_url' => 'images/womens/1.jpg', 'order' => 1],
            ['client_slug' => 'womens', 'title' => 'Relaxed Boyfriend Fit Cotton Tee', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,000 Pcs', 'image_url' => 'images/womens/2.jpg', 'order' => 2],
            ['client_slug' => 'womens', 'title' => 'Seamless Rib Knit Lounge Set', 'category' => 'Loungewear', 'gsm' => '240 GSM', 'moq' => '1,000 Pcs', 'image_url' => 'images/womens/3.jpg', 'order' => 3],
            ['client_slug' => 'womens', 'title' => 'High Waist Stretch Denim Jeans', 'category' => 'Denim', 'gsm' => '11 OZ', 'moq' => '1,200 Pcs', 'image_url' => 'images/womens/4.jpg', 'order' => 4],

            // Kids Collection
            ['client_slug' => 'kids', 'title' => 'Organic Soft Touch Baby Romper', 'category' => 'Babywear', 'gsm' => '190 GSM', 'moq' => '1,500 Pcs', 'image_url' => 'images/kids/1.jpg', 'order' => 1],
            ['client_slug' => 'kids', 'title' => 'Kids Colorful Print Cotton T-Shirt', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs', 'image_url' => 'images/kids/2.jpg', 'order' => 2],
            ['client_slug' => 'kids', 'title' => 'Fleece Zip Hoodie for Toddlers', 'category' => 'Outerwear', 'gsm' => '280 GSM', 'moq' => '1,000 Pcs', 'image_url' => 'images/kids/3.jpg', 'order' => 3],
            ['client_slug' => 'kids', 'title' => 'Elastic Waist Soft Terry Short', 'category' => 'Bottoms', 'gsm' => '220 GSM', 'moq' => '1,500 Pcs', 'image_url' => 'images/kids/4.jpg', 'order' => 4],
        ];

        // Seed full 163 items via CatalogDataService
        \App\Services\CatalogDataService::syncAll();
    }
}
