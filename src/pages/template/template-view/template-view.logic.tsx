import { useState } from 'react';
import { FormBuilderPostData } from 'react-form-builder2';
import { initialTemplate, Template, templateViewMock } from './template-view.mock';
import { useNavigate, useParams } from 'react-router-dom';

export const useTemplateViewLogic = () => {
   const { template_id } = useParams();
   const navigate = useNavigate();
   const pageIsCreate = location.href.includes('create');

   const [isShownPreview, setIsShownPreview] = useState(false);
   const [template, setTemplate] = useState<Template>(
      template_id ? templateViewMock.find((t) => t.id === +template_id) ?? initialTemplate : initialTemplate,
   );

   const handleUpdateForm = (data: FormBuilderPostData) => {
      setTemplate((prev) => ({ ...prev, fields: data.task_data }));
   };

   return {
      data: { pageIsCreate, navigate },
      state: { template, isShownPreview },
      setState: { setIsShownPreview },
      handlers: { handleUpdateForm },
   };
};
