import { useState } from 'react';
import Link from 'next/link';
import { articles } from '../../data/knowledgeCenter/articles';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface ArticleListProps {
  category: string;
  subcategory: string;
}

export default function ArticleList({ category, subcategory }: ArticleListProps) {
  const filteredArticles = articles.filter(
    article => 
      article.category === category && 
      (subcategory === 'all' || article.subcategory === subcategory)
  );

  return (
    <div className="space-y-6">
      {filteredArticles.map(article => (
        <div 
          key={article.id}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
        >
          <Link 
            href={`/knowledge/${category}/${article.id}`}
            className="block"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {article.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {article.description}
            </p>
            {article.hexaSteelContribution && (
              <div className="mt-6 bg-primary-50 p-4 rounded-lg">
                <h4 className="text-primary-700 font-medium mb-2">Hexa Steel®'s Contribution</h4>
                <p className="text-primary-900">{article.hexaSteelContribution}</p>
              </div>
            )}
            <div className="flex items-center text-primary-600 hover:text-primary-700">
              <span className="font-medium">Read more</span>
              <ChevronRightIcon className="w-5 h-5 ml-1" />
            </div>
          </Link>
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
