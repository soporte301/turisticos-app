import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function CompanyAccess() {
  const { companyName } = useParams();
  const navigate = useNavigate();
  const [companyKey] = useLocalStorage('companyKey', 'PROMO2026');
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState(false);

  const handleAccess = (e) => {
    e.preventDefault();
    if (inputKey.trim().toUpperCase() === companyKey.trim().toUpperCase()) {
      // Set session access for this company
      sessionStorage.setItem(`access_${companyName}`, 'true');
      navigate(`/catalogo/${companyName}`);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 font-body">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("/assets/img/shape/shape_1.png")', backgroundSize: 'cover' }}></div>
      
      <Card className="w-full max-w-md shadow-2xl border-0 rounded-[32px] relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
        <CardHeader className="text-center pt-10 pb-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={40} className="text-primary" />
          </div>
          <CardTitle className="text-3xl font-extrabold text-heading mb-2">Acceso Corporativo</CardTitle>
          <CardDescription className="text-bodytext text-lg px-4">
            Bienvenido, colaborador de <span className="text-primary font-bold">{companyName}</span>. Ingresa la clave mensual para ver tus beneficios.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-10">
          <form onSubmit={handleAccess} className="space-y-6 px-2">
            <div className="space-y-3">
              <Label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Clave de Acceso</Label>
              <Input 
                type="password" 
                value={inputKey} 
                onChange={(e) => setInputKey(e.target.value)} 
                placeholder="••••••••" 
                className={`h-14 text-center text-xl tracking-[0.5em] rounded-2xl border-2 transition-all ${error ? 'border-red-500 bg-red-50 animate-shake' : 'border-gray-100 focus:border-primary'}`}
                autoFocus
              />
              {error && <p className="text-red-500 text-xs font-bold text-center animate-pulse">Clave incorrecta. Por favor verifica con tu empresa.</p>}
            </div>
            
            <Button type="submit" className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/20 rounded-2xl">
              Validar y Entrar
            </Button>
            
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-center gap-2 text-sm text-bodytext hover:text-primary transition-colors font-semibold"
            >
              <ArrowLeft size={16} /> Volver al catálogo público
            </button>
          </form>
        </CardContent>
      </Card>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
}
