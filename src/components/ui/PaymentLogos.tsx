import React from 'react';
import waveLogoImg from '../../assets/images/wave_logo.png';
import orangeMoneyLogoImg from '../../assets/images/orange_money_sn.png';
import visaLogoImg from '../../assets/images/visa_logo.svg';
import mastercardLogoImg from '../../assets/images/mastercard_logo_user.png';

interface PaymentLogoProps {
  className?: string;
  size?: number;
}

export const WaveLogo: React.FC<PaymentLogoProps> = ({ className = 'w-10 h-10', size }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden flex items-center justify-center bg-[#1DC4FF] shrink-0 shadow-sm ${className}`}
      style={size ? { width: size, height: size } : undefined}
      title="Wave Mobile Money"
    >
      <img
        src={waveLogoImg}
        alt="Wave Mobile Money"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain p-1"
      />
    </div>
  );
};

export const OrangeMoneyLogo: React.FC<PaymentLogoProps> = ({ className = 'w-10 h-10', size }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden flex items-center justify-center bg-white border border-slate-700/60 shrink-0 p-1.5 shadow-sm ${className}`}
      style={size ? { width: size, height: size } : undefined}
      title="Orange Money Sénégal"
    >
      <img
        src={orangeMoneyLogoImg}
        alt="Orange Money Sénégal"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export const VisaLogo: React.FC<PaymentLogoProps> = ({ className = 'w-11 h-7', size }) => {
  return (
    <div
      className={`rounded-lg overflow-hidden flex items-center justify-center bg-white border border-slate-700/60 shrink-0 px-1.5 py-0.5 shadow-sm ${className}`}
      style={size ? { width: size, height: size } : undefined}
      title="Visa"
    >
      <img
        src={visaLogoImg}
        alt="Visa"
        referrerPolicy="no-referrer"
        className="h-4.5 sm:h-5 w-auto object-contain"
      />
    </div>
  );
};

export const MastercardLogo: React.FC<PaymentLogoProps> = ({ className = 'w-11 h-7', size }) => {
  return (
    <div
      className={`rounded-lg overflow-hidden flex items-center justify-center bg-white border border-slate-700/60 shrink-0 px-1 py-0.5 shadow-sm ${className}`}
      style={size ? { width: size, height: size } : undefined}
      title="Mastercard"
    >
      <img
        src={mastercardLogoImg}
        alt="Mastercard"
        referrerPolicy="no-referrer"
        className="h-4.5 sm:h-5 w-auto object-contain"
      />
    </div>
  );
};

export const CardPaymentLogo: React.FC<PaymentLogoProps> = ({ className = 'w-20 h-10', size }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden flex items-center justify-center gap-2 bg-white border border-slate-700/60 shrink-0 px-2.5 py-1.5 shadow-sm ${className}`}
      style={size ? { width: size, height: size } : undefined}
      title="Cartes bancaires Visa & Mastercard"
    >
      <img
        src={visaLogoImg}
        alt="Visa"
        referrerPolicy="no-referrer"
        className="h-4 sm:h-4.5 w-auto object-contain"
      />
      <span className="text-slate-300 text-xs">|</span>
      <img
        src={mastercardLogoImg}
        alt="Mastercard"
        referrerPolicy="no-referrer"
        className="h-4 sm:h-4.5 w-auto object-contain"
      />
    </div>
  );
};

export const PaymentMethodsBar: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm">
        <WaveLogo className="w-5 h-5 rounded-md" />
        <span className="text-[11px] font-semibold text-slate-200">Wave</span>
      </div>

      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm">
        <OrangeMoneyLogo className="w-5 h-5 rounded-md" />
        <span className="text-[11px] font-semibold text-slate-200">Orange Money</span>
      </div>

      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm">
        <div className="flex items-center gap-1 bg-white px-1 py-0.5 rounded">
          <img src={visaLogoImg} alt="Visa" className="h-3 w-auto object-contain" />
          <img src={mastercardLogoImg} alt="Mastercard" className="h-3 w-auto object-contain" />
        </div>
        {!compact && <span className="text-[11px] font-semibold text-slate-200">Visa / Mastercard</span>}
      </div>
    </div>
  );
};

