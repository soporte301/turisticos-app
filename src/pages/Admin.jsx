import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Link } from 'react-router-dom';
import { Settings, Plus, LayoutGrid, Trash2, Image as ImageIcon, UploadCloud, Ticket, Building2, CircleDollarSign, FileText } from 'lucide-react';

export default function Admin() {
  const [packages, setPackages] = useLocalStorage('packages', []);
  const [waNumber, setWaNumber] = useLocalStorage('waNumber', '');
  const [companyKey, setCompanyKey] = useLocalStorage('companyKey', 'PROMO2026'); // Editable company key
  const [companies, setCompanies] = useLocalStorage('companies', ['Super Colchones', 'Breadcar']); // Initial companies
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('adminAuth', false);
  const [password, setPassword] = useState('');
  
  // Package Form State
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [codigo, setCodigo] = useState('');
  const [categoria, setCategoria] = useState('Nacional');
  const [costoPublico, setCostoPublico] = useState('');
  const [companyPrices, setCompanyPrices] = useState({}); // New: object for prices per company
  const [incAlimentos, setIncAlimentos] = useState(false);
  const [incBebidas, setIncBebidas] = useState(false);
  const [incHospedaje, setIncHospedaje] = useState(false);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800; 
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        setImage(dataUrl);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleAddPackage = (e) => {
    e.preventDefault();
    if (!empresa || !descripcion || !costoPublico) return;
    
    const packageData = {
      image,
      empresa,
      descripcion,
      codigo,
      categoria,
      costoPublico,
      companyPrices,
      incAlimentos,
      incBebidas,
      incHospedaje,
    };

    if (editingId) {
      setPackages(packages.map(p => p.id === editingId ? { ...packageData, id: editingId } : p));
      setEditingId(null);
    } else {
      const newPackage = {
        ...packageData,
        id: Date.now().toString(),
      };
      setPackages([newPackage, ...packages]); 
    }
    
    // Reset
    setImage('');
    setEmpresa('');
    setDescripcion('');
    setCodigo('');
    setCategoria('Nacional');
    setCostoPublico('');
    setCompanyPrices({});
    setIncAlimentos(false);
    setIncBebidas(false);
    setIncHospedaje(false);
  };

  const handleEdit = (pkg) => {
    setEditingId(pkg.id);
    setImage(pkg.image || '');
    setEmpresa(pkg.empresa || '');
    setDescripcion(pkg.descripcion || '');
    setCodigo(pkg.codigo || '');
    setCategoria(pkg.categoria || 'Nacional');
    setCostoPublico(pkg.costoPublico || '');
    setCompanyPrices(pkg.companyPrices || {});
    setIncAlimentos(pkg.incAlimentos || false);
    setIncBebidas(pkg.incBebidas || false);
    setIncHospedaje(pkg.incHospedaje || false);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setImage('');
    setEmpresa('');
    setDescripcion('');
    setCodigo('');
    setCategoria('Nacional');
    setCostoPublico('');
    setCompanyPrices({});
    setIncAlimentos(false);
    setIncBebidas(false);
    setIncHospedaje(false);
  };

  const handleDelete = (id) => {
    setPackages(packages.filter(p => p.id !== id));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Turisticos@2026!') { // Complex default password
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Clave incorrecta');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-10">
        <Card className="w-full max-w-md shadow-xl border-0 rounded-[24px]">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-extrabold text-heading">Acceso Restringido</CardTitle>
            <CardDescription className="text-bodytext">Ingresa tu clave para administrar paquetes.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label>Contraseña</Label>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full text-lg shadow-lg shadow-primary/20">Entrar al Panel</Button>
              <div className="text-center pt-4">
                 <Link to="/" className="text-sm text-bodytext hover:text-primary transition-colors">← Volver al catálogo</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 relative z-10 font-body">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 bg-white p-8 rounded-[24px] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-heading mb-2 tracking-tight">Panel de Administración</h1>
          <p className="text-bodytext">Gestiona los paquetes turísticos y configuración de la plataforma.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="gap-2 shrink-0" onClick={() => setIsAuthenticated(false)}>
            Cerrar Sesión
          </Button>
          <Link to="/">
            <Button variant="default" className="gap-2 shrink-0 bg-primary text-white shadow-md">
              <LayoutGrid size={18} />
              Ver Catálogo
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Global Settings */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-heading text-xl">
                <Settings size={22} className="text-primary" />
                Configuración Destino
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Número de WhatsApp Destino</Label>
                <div className="flex relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">+</span>
                  <Input 
                    placeholder="Ej. 523312345678" 
                    value={waNumber} 
                    onChange={(e) => setWaNumber(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <p className="text-xs text-bodytext leading-relaxed">
                  Ingresa el número (código país) al que llegarán los mensajes de "Cotizar".
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-gray-100">
                <Label className="flex items-center gap-2"><Ticket size={16} className="text-primary"/> Clave de Empresa Mensual</Label>
                <Input 
                  placeholder="Ej. TURISTICOS2026" 
                  value={companyKey} 
                  onChange={(e) => setCompanyKey(e.target.value)}
                />
                <p className="text-xs text-bodytext leading-relaxed">
                  Esta es la clave que los empleados deben ingresar para ver precios especiales.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-gray-100">
                <Label className="flex items-center gap-2"><Building2 size={16} className="text-primary"/> Empresas Registradas</Label>
                <div className="flex gap-2">
                   <Input 
                     placeholder="Nueva Empresa..." 
                     onKeyDown={(e) => {
                       if (e.key === 'Enter') {
                         e.preventDefault();
                         const val = e.target.value.trim();
                         if (val && !companies.includes(val)) {
                           setCompanies([...companies, val]);
                           e.target.value = '';
                         }
                       }
                     }}
                   />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {companies.map(c => (
                    <span key={c} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-600">
                      {c}
                      <button onClick={() => setCompanies(companies.filter(x => x !== c))} className="hover:text-red-500">
                        <Trash2 size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Package Upload Form */}
          <Card>
            <CardHeader className="pb-4 border-b border-gray-100 mb-4">
              <CardTitle className="flex items-center gap-2 text-heading text-xl">
                <Plus size={22} className="text-primary" />
                {editingId ? 'Editar Paquete' : 'Cargar Nuevo Paquete'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddPackage} className="space-y-6">
                
                {/* Image Upload Area */}
                <div className="space-y-2">
                  <Label>Imagen Promocional</Label>
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 hover:border-primary rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors cursor-pointer relative overflow-hidden group">
                    {image ? (
                      <img src={image} alt="Preview" className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
                    ) : (
                      <div className="flex flex-col items-center pt-5 pb-6 text-gray-500 group-hover:text-primary transition-colors">
                        <UploadCloud size={32} className="mb-3" />
                        <p className="text-sm font-semibold">Haz click para subir imagen</p>
                        <p className="text-xs mt-1">Sugerido 4:3 (JPEG/PNG)</p>
                      </div>
                    )}
                    {image && (
                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <p className="text-heading font-bold bg-white/90 shadow px-4 py-2 rounded-[48px] text-sm">Cambiar Imagen</p>
                       </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Grid for Inputs */}
                <div className="grid grid-cols-1 gap-5">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Building2 size={16} className="text-bodytext"/> Empresa / Público</Label>
                    <Input 
                      value={empresa} 
                      onChange={(e) => setEmpresa(e.target.value)} 
                      placeholder="Ej. Empleados IBM" 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><LayoutGrid size={16} className="text-bodytext"/> Categoría</Label>
                    <select 
                      value={categoria} 
                      onChange={(e) => setCategoria(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200 bg-white font-bold"
                    >
                      <option value="Nacional">Nacional</option>
                      <option value="Internacional">Internacional</option>
                      <option value="Vuelos">Vuelos</option>
                      <option value="Ofertas flash">Ofertas flash</option>
                      <option value="Boda">Boda</option>
                      <option value="Viajes empresarial">Viajes empresarial</option>
                      <option value="Circuitos nacionales">Circuitos nacionales</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><CircleDollarSign size={16} className="text-bodytext"/> Precio Público (General)</Label>
                      <Input 
                        value={costoPublico} 
                        onChange={(e) => setCostoPublico(e.target.value)} 
                        placeholder="$1,500 MXN" 
                        required 
                      />
                    </div>
                    
                    {companies.length > 0 && (
                      <div className="p-4 bg-gray-50 rounded-2xl space-y-3 border border-gray-100">
                        <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Precios por Empresa</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {companies.map(comp => (
                            <div key={comp} className="space-y-1">
                              <Label className="text-[10px] font-bold">{comp}</Label>
                              <Input 
                                placeholder="Precio o 'Gratis'" 
                                value={companyPrices[comp] || ''}
                                onChange={(e) => setCompanyPrices({...companyPrices, [comp]: e.target.value})}
                                className="h-9 text-sm"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Ticket size={16} className="text-bodytext"/> Código (Promo)</Label>
                    <Input 
                      value={codigo} 
                      onChange={(e) => setCodigo(e.target.value)} 
                      placeholder="Ej. V2024" 
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-bodytext">¿Qué incluye tu paquete?</Label>
                    <div className="flex flex-wrap gap-3">
                      <button type="button" onClick={() => setIncAlimentos(!incAlimentos)} className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold border transition-colors ${incAlimentos ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-200'}`}>
                        <img src="/assets/img/icon/alimentos.png" alt="Alimentos" className="w-4 h-4 object-contain" style={{ filter: incAlimentos ? 'brightness(0) invert(1)' : 'grayscale(1)' }}/> Alimentos
                      </button>
                      <button type="button" onClick={() => setIncBebidas(!incBebidas)} className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold border transition-colors ${incBebidas ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-200'}`}>
                        <img src="/assets/img/icon/bebidas.png" alt="Bebidas" className="w-4 h-4 object-contain" style={{ filter: incBebidas ? 'brightness(0) invert(1)' : 'grayscale(1)' }}/> Bebidas
                      </button>
                      <button type="button" onClick={() => setIncHospedaje(!incHospedaje)} className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold border transition-colors ${incHospedaje ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-200'}`}>
                        <img src="/assets/img/icon/hospedaje.png" alt="Hospedaje" className="w-4 h-4 object-contain" style={{ filter: incHospedaje ? 'brightness(0) invert(1)' : 'grayscale(1)' }}/> Hospedaje
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><FileText size={16} className="text-bodytext"/> Descripción Corta</Label>
                    <Textarea 
                      value={descripcion} 
                      onChange={(e) => setDescripcion(e.target.value)} 
                      placeholder="Describe fechas, hotel, transportación..." 
                      required
                      className="resize-none h-28"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  {editingId && (
                    <Button type="button" variant="outline" onClick={cancelEdit} className="flex-1">
                      Cancelar
                    </Button>
                  )}
                  <Button type="submit" className="flex-[2] text-lg shadow-lg shadow-primary/20">
                    {editingId ? 'Guardar Cambios' : 'Publicar Paquete'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Active Packages */}
        <div className="lg:col-span-7">
          <div className="bg-white shadow-[0_10px_20px_rgba(204,204,204,0.15)] rounded-[24px] p-8 min-h-[600px] border border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
              <h2 className="text-2xl font-bold font-heading text-heading">
                Paquetes Publicados
              </h2>
              <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-extrabold shadow-sm">{packages.length}</span>
            </div>
            
            {packages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 bg-bgl rounded-full flex items-center justify-center mb-6">
                  <ImageIcon size={36} className="text-primary/40" />
                </div>
                <h3 className="text-xl font-bold font-heading text-heading mb-2">Aún no hay publicaciones</h3>
                <p className="text-bodytext text-sm max-w-sm">Utiliza el formulario de la izquierda para cargar la información y promocionar tu primer viaje.</p>
              </div>
            ) : (
               <div className="space-y-5 max-h-[800px] overflow-y-auto pr-3 custom-scrollbar">
                 {packages.map(pkg => (
                   <div key={pkg.id} className="group flex flex-col sm:flex-row bg-white border border-gray-100 shadow-sm hover:shadow-lg rounded-[24px] overflow-hidden transition-all duration-300">
                     {/* Image Box */}
                     <div className="sm:w-40 h-40 shrink-0 bg-gray-50 relative p-2">
                       <div className="w-full h-full rounded-[16px] overflow-hidden">
                         {pkg.image ? (
                            <img src={pkg.image} alt={pkg.empresa} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                         ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300"><ImageIcon size={28} /></div>
                         )}
                       </div>
                       {pkg.codigo && (
                         <div className="absolute top-4 left-4 bg-accent text-heading text-xs font-extrabold px-3 py-1 rounded-[48px] shadow">
                           {pkg.codigo}
                         </div>
                       )}
                     </div>
                     
                     {/* Content */}
                     <div className="flex-1 p-5 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-heading font-heading text-lg leading-tight group-hover:text-primary transition-colors">{pkg.empresa}</h4>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleEdit(pkg)}
                              className="text-gray-400 hover:text-white hover:bg-primary w-9 h-9 rounded-full flex items-center justify-center transition-all bg-gray-50"
                              title="Editar paquete"
                            >
                              <Settings size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(pkg.id)}
                              className="text-gray-400 hover:text-white hover:bg-red-500 w-9 h-9 rounded-full flex items-center justify-center transition-all bg-gray-50 hover:shadow-md"
                              title="Eliminar paquete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${pkg.categoria === 'Internacional' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                            {pkg.categoria || 'Nacional'}
                          </span>
                          {pkg.codigo && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-accent text-heading uppercase tracking-wider">
                              {pkg.codigo}
                            </span>
                          )}
                        </div>
                        <p className="text-primary font-extrabold text-sm mb-1">
                          Público: {pkg.costoPublico || pkg.costo || 'N/A'}
                        </p>
                        <p className="text-heading font-extrabold text-sm mb-2">
                          Empresa: {pkg.costoEmpresa || pkg.costoPublico || pkg.costo || 'N/A'}
                        </p>
                       {(pkg.incAlimentos || pkg.incBebidas || pkg.incHospedaje) && (
                         <div className="flex gap-3 mb-3 items-center">
                           {pkg.incAlimentos && <img src="/assets/img/icon/alimentos.png" alt="Alimentos" className="w-5 h-5 object-contain opacity-70" title="Alimentos incluidos" />}
                           {pkg.incBebidas && <img src="/assets/img/icon/bebidas.png" alt="Bebidas" className="w-5 h-5 object-contain opacity-70" title="Bebidas incluidas" />}
                           {pkg.incHospedaje && <img src="/assets/img/icon/hospedaje.png" alt="Hospedaje" className="w-5 h-5 object-contain opacity-70" title="Hospedaje incluido" />}
                         </div>
                       )}
                       <p className="text-sm text-bodytext line-clamp-2 leading-relaxed">{pkg.descripcion}</p>
                     </div>
                   </div>
                 ))}
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
