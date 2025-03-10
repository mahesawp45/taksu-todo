import Strings from 'constants/Strings';
import i18n from 'i18n';
import * as Yup from 'yup';

const todoValidationSchema = Yup.object({
  user: Yup.string().required(),
  title: Yup.string().required(i18n.t(Strings.todo.titleError)),
  dueDate: Yup.date().required(i18n.t(Strings.todo.dueDateError)),
});

export default todoValidationSchema;
