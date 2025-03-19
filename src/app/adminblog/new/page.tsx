"use client";

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { savePost } from '@/lib/blogApi';
import { BlogPost } from '@/lib/blogUtils';

export default function NewPostPage() {
  const router = useRouter();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    excerpt: '',
    cover_image: '',
    tags: [],
    published: false
  });
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState('');
  
  useEffect(() => {
    // Verificar autenticação
    const authenticated = localStorage.getItem('blogAdminAuth');
    if (authenticated !== 'true') {
      router.push('/adminblog');
      return;
    }
    
    setIsAuthenticated(true);
  }, [router]);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!post.title || !post.content) {
      alert('Título e conteúdo são obrigatórios');
      return;
    }
    
    try {
      setSaving(true);
      const result = await savePost(post, true);
      
      if (result.success) {
        // Redirecionar para a dashboard
        router.push('/adminblog');
      } else {
        alert(`Erro ao criar post: ${result.error}`);
      }
    } catch (error) {
      console.error('Erro ao criar post:', error);
      alert('Ocorreu um erro ao criar o post. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePublishedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(prev => ({ ...prev, published: e.target.checked }));
  };
  
  const addTag = () => {
    if (!tagInput.trim()) return;
    
    setPost(prev => ({
      ...prev,
      tags: [...(prev.tags || []), tagInput.trim()]
    }));
    
    setTagInput('');
  };
  
  const removeTag = (tagToRemove: string) => {
    setPost(prev => ({
      ...prev,
      tags: (prev.tags || []).filter(tag => tag !== tagToRemove)
    }));
  };
  
  if (!isAuthenticated) {
    return null; // Redirect é feito no useEffect
  }
  
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Novo Post</h1>
          
          <Link 
            href="/adminblog" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Voltar para o dashboard
          </Link>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Título *</label>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
              placeholder="Título do post"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">URL da Imagem de Capa</label>
            <input
              type="url"
              name="cover_image"
              value={post.cover_image}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Resumo</label>
            <input
              type="text"
              name="excerpt"
              value={post.excerpt}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
              placeholder="Breve resumo do post (opcional, será gerado automaticamente se não for fornecido)"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Conteúdo (Markdown) *</label>
            <textarea
              name="content"
              value={post.content}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white min-h-[400px]"
              placeholder="Conteúdo do post em markdown"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                placeholder="Adicionar tag"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Adicionar
              </button>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <div 
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-gray-400 hover:text-gray-200"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={post.published}
              onChange={handlePublishedChange}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-600"
            />
            <label htmlFor="published" className="ml-2 text-sm font-medium">
              Publicar post imediatamente (visível para todos)
            </label>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70"
            >
              {saving ? 'Criando...' : 'Criar Post'}
            </button>
            
            <Link 
              href="/adminblog" 
              className="px-6 py-3 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 