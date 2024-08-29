import { useState } from 'react';
import { FormBuilderPostData } from 'react-form-builder2';
import { TEMPLATE_MANAGEMENT_MOCK } from './template-management.mock';

export const useTemplateManagementLogic = () => {
   // @ts-expect-error wrong type in library
   const [formData, setFormData] = useState<FormBuilderPostData>(TEMPLATE_MANAGEMENT_MOCK);
   const [isShownPreview, setIsShownPreview] = useState(false);

   const handleUpdateForm = (data: FormBuilderPostData) => {
      setFormData(data);
   };

   return {
      data: {},
      state: { formData, isShownPreview },
      setState: { setIsShownPreview },
      handlers: { handleUpdateForm },
   };
};
