module.exports = {
   welcome: (user) => {
      let { email, first_name } = user;

      return {
         to: email,
         from: 'My Project <myproject@system.com>',
         subject: 'Bem-Vindo',
         template: 'auth/welcome',
         context: { first_name }
      }
   },

   forgotPassword: (user, token) => {
      let { email } = user;

      return {
         to: email,
         from: 'My Project <myproject@system.com>',
         subject: 'Recuperação de senha My Project',
         template: 'auth/forgot_password',
         context: { token }
      }
   }
}
