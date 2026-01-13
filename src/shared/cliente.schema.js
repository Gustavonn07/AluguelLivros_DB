import * as yup from 'yup'
import { validateCPF } from '../shared/cpfValidation.js';

export const clienteSchema = yup.object({
  name: yup
    .string()
    .required('Nome é obrigatório'),

  email: yup
    .string()
    .email('Email inválido')
    .required('Email é obrigatório'),

  cpf: yup
    .string()
    .required('CPF é obrigatório')
    .test(
      'cpf-valido',
      'CPF inválido',
      value => validateCPF(value || '')
    ),

  telephone: yup
    .string()
    .required('Telefone é obrigatório'),

  address: yup
    .string()
    .required('Endereço é obrigatório'),
})
