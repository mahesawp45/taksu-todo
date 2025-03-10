import Strings from 'constants/Strings';
import i18n from 'i18n';
import * as Yup from 'yup';

const loginValidationSchema = Yup.object({
  user: Yup.string().required(i18n.t(Strings.auth.nameRequired)),
});

export default loginValidationSchema;
