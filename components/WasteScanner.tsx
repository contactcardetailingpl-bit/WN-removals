
import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader2, Trash, Info, RefreshCw } from 'lucide-react';
import { analyzeWasteImage } from '../services/geminiService';
import { WasteAnalysis } from '../types';

const WasteScanner: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<WasteAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeWasteImage(image);
      setAnalysis(result);
    } catch (err) {
      setError("Failed to analyze image. Please ensure it's a clear photo of your waste.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setAnalysis(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section id="ai-scanner" className="py-24 bg-gray-900 text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4">Smart Waste <span className="text-emerald-500">Estimator</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Take a photo of your waste or upload an image, and our AI will provide an instant estimate and advice for removal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center border-2 border-dashed border-gray-700 mb-6">
              {image ? (
                <img src={image} alt="Upload" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-8">
                  <Camera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500">No image selected</p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
                ref={fileInputRef}
              />
              {!image ? (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <Upload size={20} /> Select Photo
                </button>
              ) : (
                <>
                  <button 
                    onClick={startAnalysis}
                    disabled={isAnalyzing}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition"
                  >
                    {isAnalyzing ? <Loader2 className="animate-spin" size={20} /> : <RefreshCw size={20} />}
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Waste'}
                  </button>
                  <button 
                    onClick={reset}
                    className="bg-gray-700 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition"
                  >
                    <Trash size={20} />
                  </button>
                </>
              )}
            </div>
            {error && <p className="mt-4 text-red-400 text-sm font-medium text-center">{error}</p>}
          </div>

          <div className="space-y-6">
            {!analysis && !isAnalyzing && (
              <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700 h-full flex flex-col items-center justify-center text-center opacity-50">
                <Info size={48} className="text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-400">Analysis Results</h3>
                <p className="text-gray-500">Upload an image to see details, volume estimates, and rough pricing.</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700 h-full flex flex-col items-center justify-center space-y-4">
                <Loader2 className="animate-spin text-emerald-500" size={48} />
                <p className="text-emerald-500 font-semibold text-lg">Wigan's Expert AI is scanning...</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-4 overflow-hidden">
                  <div className="bg-emerald-500 h-full animate-shimmer" style={{ width: '60%', background: 'linear-gradient(90deg, #10b981 0%, #34d399 50%, #10b981 100%)', backgroundSize: '200% 100%' }}></div>
                </div>
              </div>
            )}

            {analysis && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-emerald-600/10 border border-emerald-500/20 p-6 rounded-2xl">
                  <h4 className="text-emerald-500 font-bold uppercase text-xs tracking-widest mb-1">Waste Type</h4>
                  <p className="text-2xl font-bold">{analysis.type}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl">
                    <h4 className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-1">Volume Estimate</h4>
                    <p className="text-lg font-semibold">{analysis.estimatedVolume}</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl">
                    <h4 className="text-emerald-500 font-bold uppercase text-xs tracking-widest mb-1">Estimated Price</h4>
                    <p className="text-lg font-semibold text-emerald-400">{analysis.estimatedPriceRange}</p>
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl">
                  <h4 className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-1">Wigan Disposal Advice</h4>
                  <p className="text-gray-300 leading-relaxed">{analysis.disposalAdvice}</p>
                </div>

                <div className="pt-4">
                  <a href="#contact" className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition transform hover:scale-[1.02]">
                    Book Collection Now
                  </a>
                  <p className="text-center text-xs text-gray-500 mt-3 italic">
                    * AI quotes are estimates. Final price confirmed on arrival.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WasteScanner;
