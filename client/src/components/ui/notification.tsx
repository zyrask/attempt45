import { Check } from "lucide-react";

interface NotificationProps {
  show: boolean;
}

export default function Notification({ show }: NotificationProps) {
  return (
    <div 
      className={`fixed top-20 right-5 z-50 bg-midnight border border-red-accent rounded-lg p-4 shadow-xl transition-transform duration-300 ease-out ${
        show ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex items-center">
        <div className="w-6 h-6 bg-red-accent/20 rounded-full flex items-center justify-center mr-3">
          <Check className="w-3 h-3 text-red-accent" />
        </div>
        <span className="text-white font-medium">Admin mode activated!</span>
      </div>
    </div>
  );
}
