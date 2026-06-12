/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, CreditCard, Gift, Heart, HelpCircle, 
  MapPin, CheckCircle, Smartphone, Send, Hourglass, ShieldCheck,
  Search, User, Mail
} from 'lucide-react';

interface SurprisePreset {
  id: string;
  name: string;
  description: string;
  priceNGN: number;
  image: string;
  itemsIncluded: string[];
}

interface Country {
  code: string;
  name: string;
  flag: string;
  phoneCode: string;
  currency: 'NGN' | 'GBP' | 'USD' | 'AED' | 'CAD' | 'EUR' | 'SAR' | 'QAR' | 'AUD' | 'INR' | 'JPY' | 'ZAR' | 'CNY';
}

const ALL_COUNTRIES: Country[] = [
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫', phoneCode: '+93', currency: 'USD' },
  { code: 'AL', name: 'Albania', flag: '🇦🇱', phoneCode: '+355', currency: 'EUR' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿', phoneCode: '+213', currency: 'USD' },
  { code: 'AD', name: 'Andorra', flag: '🇦🇩', phoneCode: '+376', currency: 'EUR' },
  { code: 'AO', name: 'Angola', flag: '🇦🇴', phoneCode: '+244', currency: 'USD' },
  { code: 'AG', name: 'Antigua and Barbuda', flag: '🇦🇬', phoneCode: '+1-268', currency: 'USD' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', phoneCode: '+54', currency: 'USD' },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲', phoneCode: '+374', currency: 'USD' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', phoneCode: '+61', currency: 'AUD' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', phoneCode: '+43', currency: 'EUR' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿', phoneCode: '+994', currency: 'USD' },
  { code: 'BS', name: 'Bahamas', flag: '🇧🇸', phoneCode: '+1-242', currency: 'USD' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭', phoneCode: '+973', currency: 'USD' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', phoneCode: '+880', currency: 'INR' },
  { code: 'BB', name: 'Barbados', flag: '🇧🇧', phoneCode: '+1-246', currency: 'USD' },
  { code: 'BY', name: 'Belarus', flag: '🇧🇾', phoneCode: '+375', currency: 'USD' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', phoneCode: '+32', currency: 'EUR' },
  { code: 'BZ', name: 'Belize', flag: '🇧🇿', phoneCode: '+501', currency: 'USD' },
  { code: 'BJ', name: 'Benin', flag: '🇧🇯', phoneCode: '+229', currency: 'USD' },
  { code: 'BT', name: 'Bhutan', flag: '🇧🇹', phoneCode: '+975', currency: 'INR' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴', phoneCode: '+591', currency: 'USD' },
  { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦', phoneCode: '+387', currency: 'EUR' },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼', phoneCode: '+267', currency: 'ZAR' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', phoneCode: '+55', currency: 'USD' },
  { code: 'BN', name: 'Brunei', flag: '🇧🇳', phoneCode: '+673', currency: 'USD' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', phoneCode: '+359', currency: 'EUR' },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', phoneCode: '+226', currency: 'USD' },
  { code: 'BI', name: 'Burundi', flag: '🇧🇮', phoneCode: '+257', currency: 'USD' },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭', phoneCode: '+855', currency: 'USD' },
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲', phoneCode: '+237', currency: 'USD' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', phoneCode: '+1', currency: 'CAD' },
  { code: 'CV', name: 'Cape Verde', flag: '🇨🇻', phoneCode: '+238', currency: 'USD' },
  { code: 'CF', name: 'Central African Republic', flag: '🇨🇫', phoneCode: '+236', currency: 'USD' },
  { code: 'TD', name: 'Chad', flag: '🇹🇩', phoneCode: '+235', currency: 'USD' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', phoneCode: '+56', currency: 'USD' },
  { code: 'CN', name: 'China', flag: '🇨🇳', phoneCode: '+86', currency: 'CNY' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', phoneCode: '+57', currency: 'USD' },
  { code: 'KM', name: 'Comoros', flag: '🇰🇲', phoneCode: '+269', currency: 'USD' },
  { code: 'CG', name: 'Congo', flag: '🇨🇬', phoneCode: '+242', currency: 'USD' },
  { code: 'CD', name: 'Congo (DRC)', flag: '🇨🇩', phoneCode: '+243', currency: 'USD' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷', phoneCode: '+506', currency: 'USD' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷', phoneCode: '+385', currency: 'EUR' },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺', phoneCode: '+53', currency: 'USD' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾', phoneCode: '+357', currency: 'EUR' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', phoneCode: '+420', currency: 'EUR' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', phoneCode: '+45', currency: 'EUR' },
  { code: 'DJ', name: 'Djibouti', flag: '🇩🇯', phoneCode: '+253', currency: 'USD' },
  { code: 'DM', name: 'Dominica', flag: '🇩🇲', phoneCode: '+1-767', currency: 'USD' },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴', phoneCode: '+1-809', currency: 'USD' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨', phoneCode: '+593', currency: 'USD' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', phoneCode: '+20', currency: 'USD' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻', phoneCode: '+503', currency: 'USD' },
  { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶', phoneCode: '+240', currency: 'USD' },
  { code: 'ER', name: 'Eritrea', flag: '🇪🇷', phoneCode: '+291', currency: 'USD' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪', phoneCode: '+372', currency: 'EUR' },
  { code: 'SZ', name: 'Eswatini', flag: '🇸🇿', phoneCode: '+268', currency: 'ZAR' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', phoneCode: '+251', currency: 'USD' },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯', phoneCode: '+679', currency: 'USD' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', phoneCode: '+358', currency: 'EUR' },
  { code: 'FR', name: 'France', flag: '🇫🇷', phoneCode: '+33', currency: 'EUR' },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦', phoneCode: '+241', currency: 'USD' },
  { code: 'GM', name: 'Gambia', flag: '🇬🇲', phoneCode: '+220', currency: 'USD' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪', phoneCode: '+995', currency: 'USD' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', phoneCode: '+49', currency: 'EUR' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', phoneCode: '+233', currency: 'USD' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', phoneCode: '+30', currency: 'EUR' },
  { code: 'GD', name: 'Grenada', flag: '🇬🇩', phoneCode: '+1-473', currency: 'USD' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹', phoneCode: '+502', currency: 'USD' },
  { code: 'GN', name: 'Guinea', flag: '🇬🇳', phoneCode: '+224', currency: 'USD' },
  { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼', phoneCode: '+245', currency: 'USD' },
  { code: 'GY', name: 'Guyana', flag: '🇬🇾', phoneCode: '+592', currency: 'USD' },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹', phoneCode: '+509', currency: 'USD' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳', phoneCode: '+504', currency: 'USD' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', phoneCode: '+36', currency: 'EUR' },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸', phoneCode: '+354', currency: 'EUR' },
  { code: 'IN', name: 'India', flag: '🇮🇳', phoneCode: '+91', currency: 'INR' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', phoneCode: '+62', currency: 'USD' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷', phoneCode: '+98', currency: 'USD' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶', phoneCode: '+964', currency: 'USD' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', phoneCode: '+353', currency: 'EUR' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', phoneCode: '+972', currency: 'USD' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', phoneCode: '+39', currency: 'EUR' },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲', phoneCode: '+1-876', currency: 'USD' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', phoneCode: '+81', currency: 'JPY' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴', phoneCode: '+962', currency: 'USD' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', phoneCode: '+7', currency: 'USD' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', phoneCode: '+254', currency: 'USD' },
  { code: 'KI', name: 'Kiribati', flag: '🇰🇮', phoneCode: '+686', currency: 'USD' },
  { code: 'KP', name: 'Korea (North)', flag: '🇰🇵', phoneCode: '+850', currency: 'USD' },
  { code: 'KR', name: 'Korea (South)', flag: '🇰🇷', phoneCode: '+82', currency: 'USD' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼', phoneCode: '+965', currency: 'USD' },
  { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬', phoneCode: '+996', currency: 'USD' },
  { code: 'LA', name: 'Laos', flag: '🇱🇦', phoneCode: '+856', currency: 'USD' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻', phoneCode: '+371', currency: 'EUR' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧', phoneCode: '+961', currency: 'USD' },
  { code: 'LS', name: 'Lesotho', flag: '🇱🇸', phoneCode: '+266', currency: 'ZAR' },
  { code: 'LR', name: 'Liberia', flag: '🇱🇷', phoneCode: '+231', currency: 'USD' },
  { code: 'LY', name: 'Libya', flag: '🇱🇾', phoneCode: '+218', currency: 'USD' },
  { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮', phoneCode: '+423', currency: 'EUR' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹', phoneCode: '+370', currency: 'EUR' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', phoneCode: '+352', currency: 'EUR' },
  { code: 'MG', name: 'Madagascar', flag: '🇲🇬', phoneCode: '+261', currency: 'USD' },
  { code: 'MW', name: 'Malawi', flag: '🇲🇼', phoneCode: '+265', currency: 'USD' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', phoneCode: '+60', currency: 'USD' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻', phoneCode: '+960', currency: 'USD' },
  { code: 'ML', name: 'Mali', flag: '🇲🇱', phoneCode: '+223', currency: 'USD' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹', phoneCode: '+356', currency: 'EUR' },
  { code: 'MH', name: 'Marshall Islands', flag: '🇲🇭', phoneCode: '+692', currency: 'USD' },
  { code: 'MR', name: 'Mauritania', flag: '🇲🇷', phoneCode: '+222', currency: 'USD' },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺', phoneCode: '+230', currency: 'USD' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', phoneCode: '+52', currency: 'USD' },
  { code: 'FM', name: 'Micronesia', flag: '🇫🇲', phoneCode: '+691', currency: 'USD' },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩', phoneCode: '+373', currency: 'EUR' },
  { code: 'MC', name: 'Monaco', flag: '🇲🇨', phoneCode: '+377', currency: 'EUR' },
  { code: 'MN', name: 'Mongolia', flag: '🇲🇳', phoneCode: '+976', currency: 'USD' },
  { code: 'ME', name: 'Montenegro', flag: '🇲🇪', phoneCode: '+382', currency: 'EUR' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', phoneCode: '+212', currency: 'USD' },
  { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', phoneCode: '+258', currency: 'USD' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲', phoneCode: '+95', currency: 'USD' },
  { code: 'NA', name: 'Namibia', flag: '🇳🇦', phoneCode: '+264', currency: 'ZAR' },
  { code: 'NR', name: 'Nauru', flag: '🇳🇷', phoneCode: '+674', currency: 'USD' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', phoneCode: '+977', currency: 'INR' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', phoneCode: '+31', currency: 'EUR' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', phoneCode: '+64', currency: 'AUD' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮', phoneCode: '+505', currency: 'USD' },
  { code: 'NE', name: 'Niger', flag: '🇳🇪', phoneCode: '+227', currency: 'USD' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', phoneCode: '+234', currency: 'NGN' },
  { code: 'MK', name: 'North Macedonia', flag: '🇲🇰', phoneCode: '+389', currency: 'EUR' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', phoneCode: '+47', currency: 'EUR' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲', phoneCode: '+968', currency: 'USD' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', phoneCode: '+92', currency: 'USD' },
  { code: 'PW', name: 'Palau', flag: '🇵🇼', phoneCode: '+680', currency: 'USD' },
  { code: 'PA', name: 'Panama', flag: '🇵🇦', phoneCode: '+507', currency: 'USD' },
  { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬', phoneCode: '+675', currency: 'USD' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾', phoneCode: '+595', currency: 'USD' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', phoneCode: '+51', currency: 'USD' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', phoneCode: '+63', currency: 'USD' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', phoneCode: '+48', currency: 'EUR' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', phoneCode: '+351', currency: 'EUR' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', phoneCode: '+974', currency: 'QAR' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', phoneCode: '+40', currency: 'EUR' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', phoneCode: '+7', currency: 'USD' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼', phoneCode: '+250', currency: 'USD' },
  { code: 'KN', name: 'Saint Kitts and Nevis', flag: '🇰🇳', phoneCode: '+1-869', currency: 'USD' },
  { code: 'LC', name: 'Saint Lucia', flag: '🇱🇨', phoneCode: '+1-758', currency: 'USD' },
  { code: 'VC', name: 'Saint Vincent', flag: '🇻🇨', phoneCode: '+1-784', currency: 'USD' },
  { code: 'WS', name: 'Samoa', flag: '🇼🇸', phoneCode: '+685', currency: 'USD' },
  { code: 'SM', name: 'San Marino', flag: '🇸🇲', phoneCode: '+378', currency: 'EUR' },
  { code: 'ST', name: 'Sao Tome and Principe', flag: '🇸🇹', phoneCode: '+239', currency: 'USD' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', phoneCode: '+966', currency: 'SAR' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳', phoneCode: '+221', currency: 'USD' },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸', phoneCode: '+381', currency: 'EUR' },
  { code: 'SC', name: 'Seychelles', flag: '🇸🇨', phoneCode: '+248', currency: 'USD' },
  { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', phoneCode: '+232', currency: 'USD' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', phoneCode: '+65', currency: 'USD' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰', phoneCode: '+421', currency: 'EUR' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮', phoneCode: '+386', currency: 'EUR' },
  { code: 'SB', name: 'Solomon Islands', flag: '🇸🇧', phoneCode: '+677', currency: 'USD' },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴', phoneCode: '+252', currency: 'USD' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', phoneCode: '+27', currency: 'ZAR' },
  { code: 'SS', name: 'South Sudan', flag: '🇸🇸', phoneCode: '+211', currency: 'USD' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', phoneCode: '+34', currency: 'EUR' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', phoneCode: '+94', currency: 'USD' },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩', phoneCode: '+249', currency: 'USD' },
  { code: 'SR', name: 'Suriname', flag: '🇸🇷', phoneCode: '+597', currency: 'USD' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', phoneCode: '+46', currency: 'EUR' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', phoneCode: '+41', currency: 'EUR' },
  { code: 'SY', name: 'Syria', flag: '🇸🇾', phoneCode: '+963', currency: 'USD' },
  { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯', phoneCode: '+992', currency: 'USD' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', phoneCode: '+255', currency: 'USD' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', phoneCode: '+66', currency: 'USD' },
  { code: 'TL', name: 'Timor-Leste', flag: '🇹🇱', phoneCode: '+670', currency: 'USD' },
  { code: 'TG', name: 'Togo', flag: '🇹🇬', phoneCode: '+228', currency: 'USD' },
  { code: 'TO', name: 'Tonga', flag: '🇹🇴', phoneCode: '+676', currency: 'USD' },
  { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹', phoneCode: '+1-868', currency: 'USD' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳', phoneCode: '+216', currency: 'USD' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', phoneCode: '+90', currency: 'USD' },
  { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲', phoneCode: '+993', currency: 'USD' },
  { code: 'TV', name: 'Tuvalu', flag: '🇹🇻', phoneCode: '+688', currency: 'USD' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬', phoneCode: '+256', currency: 'USD' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', phoneCode: '+380', currency: 'EUR' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', phoneCode: '+971', currency: 'AED' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', phoneCode: '+44', currency: 'GBP' },
  { code: 'US', name: 'United States', flag: '🇺🇸', phoneCode: '+1', currency: 'USD' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾', phoneCode: '+598', currency: 'USD' },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿', phoneCode: '+998', currency: 'USD' },
  { code: 'VU', name: 'Vanuatu', flag: '🇻🇺', phoneCode: '+678', currency: 'USD' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪', phoneCode: '+58', currency: 'USD' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', phoneCode: '+84', currency: 'USD' },
  { code: 'YE', name: 'Yemen', flag: '🇾🇪', phoneCode: '+967', currency: 'USD' },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲', phoneCode: '+260', currency: 'USD' },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', phoneCode: '+263', currency: 'ZAR' }
];

export default function DiasporaHub({ 
  onCustomAddCart,
  setCurrentTab 
}: { 
  onCustomAddCart: (item: any, portion: string, spiciness: string, scheduledDate?: string) => void;
  setCurrentTab: (tab: string) => void;
}) {
  const [currency, setCurrency] = React.useState<'NGN' | 'GBP' | 'USD' | 'AED' | 'CAD' | 'EUR' | 'SAR' | 'QAR' | 'AUD' | 'INR' | 'JPY' | 'ZAR' | 'CNY'>('GBP');
  const [scheduledSurpriseDate, setScheduledSurpriseDate] = React.useState('2026-06-20');
  
  // Sender info states (Option 1 - Custom Diaspora Billing Profiles)
  const [senderName, setSenderName] = React.useState('Chidi Bello');
  const [senderEmail, setSenderEmail] = React.useState('chidi.bello@example.com');
  const [senderPhoneSuffix, setSenderPhoneSuffix] = React.useState('7412345678');
  const [senderCountry, setSenderCountry] = React.useState<Country>(ALL_COUNTRIES.find(c => c.code === 'GB') || ALL_COUNTRIES[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = React.useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = React.useState('');

  // Recipient states
  const [recipeipientName, setRecipeipientName] = React.useState('Hajia Amina Sule');
  const [recipientPhone, setRecipientPhone] = React.useState('+234 803 209 8812');
  const [recipientAddress, setRecipientAddress] = React.useState('House No 4, Kano High Ridge, BUK Gate Road, Kano.');
  const [giftCardMessage, setGiftCardMessage] = React.useState('Happy Retirement Mummy ! Enjoy Zainab Bello’s pristine golden chops. Love from London.');
  const [selectedPresetId, setSelectedPresetId] = React.useState('preset-1');
  const [surpriseOrderedFeedback, setSurpriseOrderedFeedback] = React.useState(false);

  // Conversion values relative to base Naira (NGN)
  const currencySymbols = { 
    NGN: '₦', GBP: '£', USD: '$', AED: 'د.إ', CAD: 'C$', 
    EUR: '€', SAR: 'SR', QAR: 'QR', AUD: 'A$', INR: '₹', 
    JPY: '¥', ZAR: 'R', CNY: '¥' 
  };
  const currencyRates = { 
    NGN: 1, GBP: 0.00062, USD: 0.00078, AED: 0.00286, CAD: 0.00105, 
    EUR: 0.00072, SAR: 0.00293, QAR: 0.00284, AUD: 0.00118, INR: 0.065, 
    JPY: 0.12, ZAR: 0.0145, CNY: 0.00566
  };

  const exchangeAndFormat = (amountNGN: number) => {
    const rate = currencyRates[currency];
    const converted = amountNGN * rate;
    const formatted = converted.toLocaleString(undefined, {
      minimumFractionDigits: currency === 'NGN' ? 0 : 2,
      maximumFractionDigits: currency === 'NGN' ? 0 : 2
    });
    return `${currencySymbols[currency]} ${formatted}`;
  };

  const surprisePresets: SurprisePreset[] = [
    {
      id: 'preset-1',
      name: 'The Imperial Kano Blessing Box',
      description: 'A lavish luxury layout designed to drop jaws and trigger tears of pure celebration joy.',
      priceNGN: 48000,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400',
      itemsIncluded: ['24 Gold-Flaked Beef Samosas', '12 Gourmet Prawn Spring Rolls', '12 Glazed Peppered Chicken Wings', '12 Gizdodo Skewer Cups', '2 Custom Hibiscus-Cardamom Spritzes']
    },
    {
      id: 'preset-2',
      name: 'Grandma’s Arewa Soft Sweet Tray',
      description: 'Stuffed with soft, easy-to-bite traditional treats layered with modern luxury glazes.',
      priceNGN: 32000,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400',
      itemsIncluded: ['36 Cinnamon Puffs with Gold Dust', '12 Soft Coconut Pancake Pockets', '12 Baked Milksweet Balls', '2 Pure Ginger-Honey Zobo Bottles']
    },
    {
      id: 'preset-3',
      name: 'High-Society Milestone Platter',
      description: 'Perfect for remote ordering of weddings or naming ceremonies held back home in Gwale/Janbulo.',
      priceNGN: 75000,
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600',
      itemsIncluded: ['40 Suya-Spiced Gizdodo Medleys', '24 Sweet Chili Saffron Sausage Rolls', '24 Herb-Infused Dough puffs', '4 Signature Ginger-Zobo Decanters']
    }
  ];

  const activePreset = surprisePresets.find(p => p.id === selectedPresetId) || surprisePresets[0];

  const handleSelectCountry = (country: Country) => {
    setSenderCountry(country);
    // Align billing currency automatically
    if (currencyRates[country.currency]) {
      setCurrency(country.currency);
    } else {
      setCurrency('USD');
    }
    setIsCountryDropdownOpen(false);
  };

  const handleDiasporaCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Map custom structure to parent Cart Item format
    const itemAsMenuItem = {
      id: activePreset.id,
      name: activePreset.name,
      category: 'gift-boxes' as any,
      price: activePreset.priceNGN,
      image: activePreset.image,
      description: `${activePreset.description} (Surprise gift from ${senderName} in ${senderCountry.name} to ${recipeipientName})`,
      ingredients: activePreset.itemsIncluded,
      portionSizes: ['Imperial Gift Box'],
      availability: '24h Notice' as any,
      rating: 4.9,
      reviewsCount: 142
    };

    onCustomAddCart(
      itemAsMenuItem, 
      'Imperial Gift Box', 
      `Sender: ${senderName} (${senderEmail}, ${senderCountry.flag} Tel: ${senderCountry.phoneCode} ${senderPhoneSuffix}) | Recipient: ${recipeipientName} (Tel: ${recipientPhone}) | Msg: ${giftCardMessage}`, 
      scheduledSurpriseDate
    );

    setSurpriseOrderedFeedback(true);
  };

  const filteredCountries = ALL_COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(countrySearchQuery.toLowerCase()) || 
    c.code.toLowerCase().includes(countrySearchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="diaspora-portal">
      
      {/* 1. Header Hero Panel */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/35 rounded-full px-3.5 py-1 text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
          <Globe className="w-3 h-3 text-[#D4AF37]" />
          <span>Global Diaspora Desk</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#FDFBF7] font-semibold tracking-tight">
          Catering Home from <span className="text-[#D4AF37]">Anywhere on Earth</span>
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed font-sans">
          No matter where you reside globally, cherish your parents, siblings, or friends in Kano with high-fidelity local deliveries. Input your residing country using our searchable world selector, choose your billing currency, and schedule premium hot small chops boxes instantly.
        </p>
      </div>

      {/* 2. Currency Selector & Preset Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Preset Display Customizations */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Currency Controller */}
          <div className="bg-emerald-950/60 border border-[#D4AF37]/20 p-5 rounded-3xl flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-serif text-[#FDFBF7] font-bold">Billing Currency & Live Exchange Desk</h4>
                <p className="text-[10px] text-emerald-100/60 font-mono">12 global currencies calibrated with high-precision checkout</p>
              </div>
              <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2.5 py-1 rounded-md border border-[#D4AF37]/20 font-mono font-bold align-middle shrink-0 self-start sm:self-center">
                ACTIVE CURRENCY: {currency} ({currencySymbols[currency]})
              </span>
            </div>
            
            {/* Horizontal Scrollable Currency Selector Tray */}
            <div className="flex gap-1.5 overflow-x-auto max-w-full pb-2 scrollbar-thin scrollbar-thumb-[#D4AF37]/30 scrollbar-track-transparent">
              {(Object.keys(currencyRates) as Array<keyof typeof currencyRates>).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setCurrency(curr)}
                  className={`px-3.5 py-1.5 rounded-lg text-[10px] font-mono uppercase cursor-pointer transition-all border whitespace-nowrap shrink-0 ${
                    currency === curr 
                      ? 'bg-[#D4AF37] text-[#052E16] font-bold border-[#D4AF37]' 
                      : 'bg-emerald-950 text-emerald-100/60 border-emerald-100/10 hover:text-[#D4AF37] hover:border-[#D4AF37]/30'
                  }`}
                >
                  {curr} ({currencySymbols[curr]})
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Preset Cards */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm text-[#FDFBF7] uppercase tracking-wide font-bold">Select surprise gourmet Tray Package</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {surprisePresets.map((preset) => {
                const isActive = preset.id === selectedPresetId;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPresetId(preset.id)}
                    className={`p-3 rounded-2xl text-left flex flex-col justify-between aspect-[3/4] border transition-all relative overflow-hidden group cursor-pointer ${
                      isActive 
                        ? 'bg-emerald-900/60 border-[#D4AF37] shadow-lg' 
                        : 'bg-emerald-950/20 border-emerald-100/10 hover:border-[#D4AF37]/30'
                    }`}
                  >
                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10" />
                    
                    <img 
                      src={preset.image} 
                      alt={preset.name} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />

                    {/* Top Tag status info */}
                    <div className="relative z-20 self-end">
                      <span className="text-[8px] uppercase font-mono tracking-widest bg-emerald-950 border border-[#D4AF37]/30 text-[#D4AF37] font-bold px-2 py-0.5 rounded-full">
                        Surprise box
                      </span>
                    </div>

                    {/* Bottm textual briefs */}
                    <div className="relative z-20 text-[#FDFBF7] space-y-1">
                      <h5 className="font-serif text-xs font-semibold tracking-wide">{preset.name}</h5>
                      <span className="font-mono text-[11px] text-[#D4AF37] font-extrabold block">
                        {exchangeAndFormat(preset.priceNGN)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Preset Details and ingredients lists */}
            <div className="bg-emerald-950/20 border border-emerald-500/10 p-5 rounded-2xl space-y-4">
              <div>
                <h5 className="font-serif text-[#FDFBF7] text-sm font-bold">{activePreset.name}</h5>
                <p className="text-xs text-emerald-100/70 mt-1 leading-relaxed font-sans">{activePreset.description}</p>
              </div>

              <div className="border-t border-emerald-500/10 pt-3">
                <span className="text-[9px] uppercase font-mono tracking-widest text-[#D4AF37] block font-bold mb-2">Plating Pieces Included:</span>
                <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                  {activePreset.itemsIncluded.map((itm, i) => (
                    <span key={i} className="bg-emerald-900/60 text-emerald-100/80 px-2.5 py-1 rounded border border-emerald-500/10">
                      • {itm}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Dispatching & Recipient Credentials details */}
        <div className="lg:col-span-5">
          <div className="bg-[#052E16]/50 border border-[#D4AF37]/25 p-6 rounded-3xl space-y-5 relative backdrop-blur-md">
            
            <h4 className="font-serif text-sm text-[#FDFBF7] font-bold flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-[#D4AF37]" />
              <span>International Surprise Gifting Form</span>
            </h4>

            <form onSubmit={handleDiasporaCheckout} className="space-y-5">
              
              {/* SECTION A: SENDER INFO */}
              <div className="border-b border-emerald-500/10 pb-4 space-y-3">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">1. Your Residing Billing Profile</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[9px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Your Full Name</label>
                    <div className="relative">
                      <User className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-emerald-100/40" />
                      <input 
                        type="text" 
                        required
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-emerald-950/40 border border-[#D4AF37]/25 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:outline-none"
                        placeholder="e.g. Chidi Bello"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Your Contact Email</label>
                    <div className="relative">
                      <Mail className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-emerald-100/40" />
                      <input 
                        type="email" 
                        required
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-emerald-950/40 border border-[#D4AF37]/25 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:outline-none"
                        placeholder="chidi@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Searchable World Country Selector Widget (Option 1 - Eliminating 5 Countries Limit) */}
                <div className="relative">
                  <label className="block text-[9px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Current Billing Country</label>
                  <button
                    type="button"
                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                    className="w-full px-3 py-2 bg-emerald-950/60 border border-[#D4AF37]/40 rounded-lg text-xs text-[#FDFBF7] flex items-center justify-between focus:border-[#D4AF37] focus:outline-none cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{senderCountry.flag}</span>
                      <span className="font-sans font-medium">{senderCountry.name} ({senderCountry.code})</span>
                    </div>
                    <span className="text-[#D4AF37] font-mono text-[9px] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                      Search ⌵
                    </span>
                  </button>

                  <AnimatePresence>
                    {isCountryDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 right-0 z-50 mt-1 bg-[#052E16] border border-[#D4AF37]/35 rounded-xl shadow-2xl p-2.5 max-h-60 flex flex-col"
                      >
                        {/* Interactive Search Bar inside country drawer */}
                        <div className="relative mb-2 shrink-0">
                          <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-emerald-100/40" />
                          <input
                            type="text"
                            value={countrySearchQuery}
                            onChange={(e) => setCountrySearchQuery(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 bg-emerald-950/80 border border-[#D4AF37]/20 rounded-lg text-xs text-white placeholder-emerald-100/40 focus:outline-none focus:border-[#D4AF37] font-sans"
                            placeholder="Type country name or abbreviation..."
                            autoFocus
                          />
                        </div>

                        {/* List Scrolled */}
                        <div className="overflow-y-auto flex-1 space-y-0.5 divide-y divide-emerald-900/10 pr-1 select-none custom-scrollbar">
                          {filteredCountries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => handleSelectCountry(country)}
                              className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between hover:bg-[#D4AF37]/15 transition-all cursor-pointer text-emerald-100/95 ${
                                senderCountry.code === country.code ? 'bg-[#D4AF37]/20 text-[#D4AF37] font-semibold' : ''
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-base">{country.flag}</span>
                                <span className="font-sans">{country.name}</span>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0 text-[10px] font-mono text-[#D4AF37]">
                                <span>{country.phoneCode}</span>
                                <span className="text-[8px] opacity-60">({country.currency})</span>
                              </div>
                            </button>
                          ))}
                          {filteredCountries.length === 0 && (
                            <div className="text-center py-5 text-[10px] text-emerald-100/40 font-mono">
                              No world countries matching search.
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sender international phone with auto selected prompt */}
                <div>
                  <label className="block text-[9px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Your Resident Phone Number</label>
                  <div className="flex rounded-lg overflow-hidden border border-[#D4AF37]/30 bg-emerald-950/40 focus-within:border-[#D4AF37] transition-all">
                    <span className="px-3 bg-emerald-900/30 text-emerald-100/75 flex items-center text-xs font-mono border-r border-[#D4AF37]/20">
                      {senderCountry.phoneCode}
                    </span>
                    <input 
                      type="tel" 
                      required
                      value={senderPhoneSuffix}
                      onChange={(e) => setSenderPhoneSuffix(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-transparent text-xs text-[#FDFBF7] focus:outline-none font-mono"
                      placeholder="e.g. 7412345678"
                    />
                  </div>
                </div>

                <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-2 text-[9px] text-[#D4AF37] font-mono rounded-lg text-center">
                  ✦ Dynamic alignment: Selecting {senderCountry.flag} {senderCountry.name} auto-maps checkout to {senderCountry.currency} ({currencySymbols[senderCountry.currency]})!
                </div>
              </div>

              {/* SECTION B: RECIPIENT IN KANO */}
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold">2. Recipient Delivery profile (Kano destination)</span>
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Recipient's name in Kano</label>
                  <input 
                    type="text" 
                    required
                    value={recipeipientName}
                    onChange={(e) => setRecipeipientName(e.target.value)}
                    className="w-full px-3 py-1.5 bg-emerald-950/40 border border-[#D4AF37]/25 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:outline-none"
                    placeholder="e.g. Hajia Amina Sule"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Recipient's Kano Mobile line</label>
                  <input 
                    type="text" 
                    required
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    className="w-full px-3 py-1.5 bg-emerald-950/40 border border-[#D4AF37]/25 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:outline-none font-mono"
                    placeholder="e.g. +234 803 209 8812"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Physical address (Kano / Gwale / Janbulo)</label>
                  <input 
                    type="text" 
                    required
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="w-full px-3 py-1.5 bg-emerald-950/40 border border-[#D4AF37]/25 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:outline-none"
                    placeholder="e.g. House No 4, Kano High Ridge, Janbulo First Gate BUK Entrance"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Scheduled surprise Date</label>
                  <input 
                    type="date" 
                    required
                    value={scheduledSurpriseDate}
                    onChange={(e) => setScheduledSurpriseDate(e.target.value)}
                    className="w-full px-3 py-1.5 bg-emerald-950/40 border border-[#D4AF37]/25 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-mono tracking-wider text-emerald-100/70 font-bold mb-1">Personalized Card Message</label>
                  <textarea 
                    value={giftCardMessage}
                    rows={2}
                    maxLength={160}
                    onChange={(e) => setGiftCardMessage(e.target.value)}
                    className="w-full px-3 py-1.5 bg-emerald-950/40 border border-[#D4AF37]/25 rounded-lg text-xs text-[#FDFBF7] focus:border-[#D4AF37] focus:outline-none"
                    placeholder="Writing something lovely for their day..."
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] text-xs font-serif font-black uppercase tracking-widest py-3 rounded-xl transition-all shadow-md text-center flex items-center justify-center gap-1.5 cursor-pointer pt border border-[#D4AF37]"
              >
                <Send className="w-4 h-4 text-[#052E16]" />
                <span>Dispatch Surprise Cart ({exchangeAndFormat(activePreset.priceNGN)})</span>
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Trust guarantees badge line */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center text-xs font-mono py-6 border-y border-[#D4AF37]/15">
        <div className="space-y-1">
          <ShieldCheck className="w-5 h-5 text-[#D4AF37] mx-auto" />
          <h5 className="font-serif text-[#FDFBF7] font-semibold text-[10px] uppercase">Secure payment</h5>
          <p className="text-emerald-100/50 text-[9px]">Stripe + Paystack PCI compliant</p>
        </div>
        <div className="space-y-1">
          <Globe className="w-5 h-5 text-[#D4AF37] mx-auto" />
          <h5 className="font-serif text-[#FDFBF7] font-semibold text-[10px] uppercase">World Currency Desk</h5>
          <p className="text-emerald-100/50 text-[9px]">Check out in NGN, GBP, USD, AED, CAD, EUR, etc.</p>
        </div>
        <div className="space-y-1">
          <Smartphone className="w-5 h-5 text-[#D4AF37] mx-auto" />
          <h5 className="font-serif text-[#FDFBF7] font-semibold text-[10px] uppercase">Live tracking</h5>
          <p className="text-emerald-100/50 text-[9px]">Updates dispatched to WhatsApp</p>
        </div>
        <div className="space-y-1">
          <Hourglass className="w-5 h-5 text-[#D4AF37] mx-auto" />
          <h5 className="font-serif text-[#FDFBF7] font-semibold text-[10px] uppercase">24h SLA Notice</h5>
          <p className="text-emerald-100/50 text-[9px]">Handcrafted freshest guaranteed arrival</p>
        </div>
      </div>

      {/* Success notification overlay */}
      <AnimatePresence>
        {surpriseOrderedFeedback && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#052E16] border border-[#D4AF37]/35 rounded-3xl p-6 max-w-sm w-full text-center space-y-5 shadow-2xl relative"
            >
              <div className="w-14 h-14 bg-[#D4AF37]/15 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37]">
                <Gift className="w-7 h-7" />
              </div>

              <div className="space-y-1.5">
                <h4 className="font-serif text-lg text-[#FDFBF7] font-bold">Surprise Dispatched to Cart</h4>
                <p className="text-xs text-emerald-100/70 leading-relaxed font-sans">
                  The surprise gourmet package has been routed successfully to your Royal Shopping Cart!
                </p>
              </div>

              <div className="bg-emerald-950/80 border border-[#D4AF37]/20 rounded-2xl p-4 text-left space-y-1 font-mono text-[10px] text-emerald-100/80">
                <p><strong>SENDER:</strong> {senderName} ({senderCountry.flag} {senderCountry.name})</p>
                <p><strong>BILLING TOTAL:</strong> {exchangeAndFormat(activePreset.priceNGN)}</p>
                <p><strong>RECIPIENT:</strong> {recipeipientName}</p>
                <p><strong>DELIVERY PLACE:</strong> {recipientAddress}</p>
                <p><strong>DATE:</strong> {scheduledSurpriseDate}</p>
                <p className="text-[#D4AF37]"><strong>CARD:</strong> "{giftCardMessage}"</p>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setSurpriseOrderedFeedback(false)}
                  className="flex-1 bg-emerald-900 hover:bg-emerald-850 text-white border border-emerald-100/10 py-2.5 rounded-xl text-xs font-serif uppercase tracking-widest cursor-pointer transition-colors"
                >
                  Configure More
                </button>
                <button 
                  onClick={() => { setSurpriseOrderedFeedback(false); setCurrentTab('menu'); }}
                  className="flex-1 bg-[#D4AF37] hover:bg-[#C5A028] text-[#052E16] py-2.5 rounded-xl text-xs font-serif uppercase tracking-widest font-black cursor-pointer transition-colors"
                >
                  Checkout Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
