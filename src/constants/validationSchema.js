import * as yup from "yup";

const VN_PHONE_REGEX = /^0(3[2-9]|5[689]|7[06-9]|8[0-689]|9[0-46-9])[0-9]{7}$/;

export const ANGLER_PROFILE_FORM = yup.object().shape({
  avatarUrl: yup.string(),
  fullName: yup.string().required("Họ và tên không được bỏ trống"),
  gender: yup.bool(),
  address: yup.string(),
  provinceId: yup.number(),
  districtId: yup.number(),
  wardId: yup.number(),
});

export const ANGLER_PROFILE_PASSWORD_CHANGE_FORM = yup.object().shape({
  oldPassword: yup.string().required("Mật khẩu cũ không được bỏ trống"),
  newPassword: yup.string().required("Mật khẩu mới không được bỏ trống"),
  repeatPassword: yup
    .string()
    .required("Trường này không được bỏ trống")
    .oneOf([yup.ref("newPassword"), null], "Mật khẩu không khớp"),
});

export const ANGLER_PROFILE_PHONE_CHANGE_FORM = yup.object().shape({
  phone: yup
    .string()
    .matches(VN_PHONE_REGEX, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không được bỏ trống"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự")
    .required("Mật khẩu không được bỏ trống"),
});

export const ANGLER_CATCH_REPORT_FORM = yup.object().shape({
  imageArray: yup.array().min(1, "Ảnh không được bỏ trống"),
  description: yup.string().required("Miêu tả không được bỏ trống"),
  lakeId: yup
    .number()
    .typeError("Trường này chỉ được nhập số")
    .required("Loại hồ không được bỏ trống"),
  hidden: yup.bool(),
  catchesDetailList: yup
    .array()
    .min(1, "Phải có ít nhất một thẻ cá")
    .max(10, "Chỉ được tạo tối đa 10 thẻ cá")
    .of(
      yup.object().shape({
        fishInLakeId: yup
          .number()
          .notOneOf([0], "Loại cá không được bỏ trống")
          .typeError("Trường này chỉ được nhập số")
          .required("Loại cá không được bỏ trống"),
        quantity: yup
          .number()
          .typeError("Trường này chỉ được nhập số")
          .required("Số lượng không được bỏ trống")
          .moreThan(0, "Số lượng phải lớn hơn 0")
          .max(9999, "Số lượng tối đa là 9999")
          .integer("Số lượng phải là số nguyên"),
        weight: yup
          .number()
          .typeError("Trường này chỉ được nhập số")
          .required("Cân nặng không được bỏ trống")
          .moreThan(0, "Cân nặng phải lớn hơn 0")
          .max(9999, "Cân nặng tối đa là 9999kg"),
        returnToOwner: yup.bool().default(false),
      }),
    ),
});

export const FMANAGE_LAKE_FORM = yup.object().shape({
  imageArray: yup.array().min(1, "Ảnh không được bỏ trống"),
  name: yup.string().required("Tên hồ không được bỏ trống"),
  price: yup.string().required("Miêu tả giá vé ở hồ này"),
  methods: yup.array().min(1, "Trường này không được bỏ trống"),
  length: yup
    .number()
    .min(0.1, "Độ dài phải lớn hơn 0")
    .max(1000, "Độ dài tối đa là 1000m")
    .typeError("Trường này chỉ được nhập số")
    .required("Chiều dài hồ không được bỏ trống"),
  width: yup
    .number()
    .min(0.1, "Độ rộng phải lớn hơn 0")
    .max(1000, "Độ rộng tối đa là 1000m")
    .typeError("Trường này chỉ được nhập số")
    .required("Chiều rộng hồ không được bỏ trống"),
  depth: yup
    .number()
    .min(0.1, "Độ sâu phải lớn hơn 0")
    .max(50, "Độ sâu tối đa là 50m")
    .required("Độ sâu của hồ không được bỏ trống"),
  fishInLakeList: yup
    .array()
    .min(1, "Phải có ít nhất một loại cá trong hồ")
    .max(3, "Tối đa thẻ cá được tạo là 3")
    .of(
      yup.object().shape(
        {
          fishSpeciesId: yup
            .number()
            .required("Trường này không được bỏ trống"),
          minWeight: yup
            .number()
            .typeError("Trường này chỉ được nhập số")
            .min(0.1, "Cân nặng phải lớn hơn 0")
            .max(9999, "Cân nặng tối đa là 9999kg")
            .required("Biểu nhỏ không được bỏ trống"),
          maxWeight: yup
            .number()
            .typeError("Trường này chỉ được nhập số")
            .min(0.1, "Cân nặng phải lớn hơn 0")
            .max(9999, "Cân nặng tối đa là 9999kg")
            .required("Biểu lớn không được bỏ trống"),
          quantity: yup
            .number()
            .typeError("Trường này chỉ được nhập số")
            .min(0, "Số lượng phải lớn hơn 0")
            .max(9999, "Số lượng tối đa là 9999")
            .integer("Số lượng phải là số nguyên")
            .when("totalWeight", {
              is: 0,
              then: yup
                .number()
                .typeError("Trường này chỉ được nhập số")
                .notOneOf([0], "Số lượng không được bỏ trống"),
            }),
          totalWeight: yup
            .number()
            .typeError("Trường này chỉ được nhập số")
            .min(0, "Cân nặng phải lớn hơn 0")
            .max(9999, "Cân nặng tối đa là 9999kg")
            .when("quantity", {
              is: 0,
              then: yup
                .number()
                .typeError("Trường này chỉ được nhập số")
                .notOneOf([0], "Cân nặng không được bỏ trống"),
            }),
        },
        ["totalWeight", "quantity"],
      ),
    ),
});

export const FMANAGE_LAKE_FISH_EDIT_FORM = yup.object().shape(
  {
    quantity: yup
      .number()
      .typeError("Trường này chỉ được nhập số")
      .min(0, "Số lượng phải lớn hơn 0")
      .max(9999, "Phải nhập số bé hoặc bằng 9999")
      .integer("Số lượng phải là số nguyên")
      .when("weight", {
        is: 0,
        then: yup
          .number()
          .typeError("Trường này chỉ được nhập số")
          .notOneOf([0], "Số lượng không được bỏ trống"),
      }),
    weight: yup
      .number()
      .typeError("Trường này chỉ được nhập số")
      .min(0, "Cân nặng phải lớn hơn 0")
      .max(9999, "Phải nhập số bé hoặc bằng 9999")
      .when("quantity", {
        is: 0,
        then: yup
          .number()
          .typeError("Trường này chỉ được nhập số")
          .notOneOf([0], "Cân nặng không được bỏ trống"),
      }),
  },
  ["quantity", "weight"],
);

export const FMANAGE_LAKE_FISH_ADD_FORM = yup.object().shape(
  {
    fishSpeciesId: yup.number().required("Trường này không được bỏ trống"),
    minWeight: yup
      .number()
      .typeError("Trường này chỉ được nhập số")
      .min(0.1, "Phải nhập lớn hơn 0")
      .max(9999, "Phải nhập bé hơn hoặc bằng 9999")
      .required("Biểu nhỏ không được bỏ trống"),
    maxWeight: yup
      .number()
      .typeError("Trường này chỉ được nhập số")
      .min(0.1, "Phải nhập lớn hơn 0")
      .max(9999, "Phải nhập bé hơn hoặc bằng 9999")
      .required("Biểu lớn không được bỏ trống"),
    quantity: yup
      .number()
      .typeError("Trường này chỉ được nhập số")
      .min(0, "Số lượng phải lớn hơn 0")
      .max(9999, "Phải nhập số bé hoặc bằng 9999")
      .integer("Số lượng phải là số nguyên")
      .when("totalWeight", {
        is: 0,
        then: yup
          .number()
          .typeError("Trường này chỉ được nhập số")
          .notOneOf([0], "Số lượng không được bỏ trống"),
      }),
    totalWeight: yup
      .number()
      .typeError("Trường này chỉ được nhập số")
      .min(0, "Cân nặng phải lớn hơn 0")
      .max(9999, "Phải nhập số bé hoặc bằng 9999")
      .when("quantity", {
        is: 0,
        then: yup
          .number()
          .typeError("Trường này chỉ được nhập số")
          .notOneOf([0], "Cân nặng không được bỏ trống"),
      }),
  },
  ["quantity", "totalWeight"],
);

export const FMANAGE_PROFILE_FORM = yup.object().shape({
  imageArray: yup.array().min(1, "Hãy chọn tối đa 5 ảnh cho hồ"),
  name: yup.string().required("Tên địa điểm không được bỏ trống"),
  phone: yup
    .string()
    .matches(VN_PHONE_REGEX, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không dược bỏ trống"),
  website: yup.string().typeError("Website không hợp lệ").ensure(),
  address: yup.string().required("Địa chỉ không được bỏ trống"),
  provinceId: yup
    .number()
    .moreThan(0, "Tỉnh/Thành phố không được bỏ trống")
    .required("Tỉnh/Thành phố không được bỏ trống"),
  districtId: yup
    .number()
    .moreThan(0, "Quận/Huyện không được bỏ trống")
    .required("Quận/Huyện không được bỏ trống"),
  wardId: yup
    .number()
    .moreThan(0, "Phường/xã không được bỏ trống")
    .required("Phường/xã không được bỏ trống"),
  description: yup.string().required("Miêu tả điểm câu không được bỏ trống"),
  rule: yup.string().required("Nội quy điểm câu không được bỏ trống"),
  service: yup.string().required("Dịch vụ điểm câu không được bỏ trống"),
  timetable: yup
    .string()
    .required("Lịch biểu của điểm câu không được bỏ trống"),
});

export const ADMIN_FISH_ADD_EDIT_FORM = yup.object().shape({
  name: yup.string().required("Tên cá không được bỏ trống"),
  imageArray: yup.array().min(1, "Ảnh không được bỏ trống"),
});

export const ADMIN_FISHING_METHOD_ADD_FORM = yup.object().shape({
  name: yup.string().required("Tên loại hình không được bỏ trống"),
});

export const FMANAGE_SUGGESTION_FORM = yup.object().shape({
  name: yup.string().required("Tên khu hồ không được bỏ trống"),
  phone: yup
    .string()
    .matches(VN_PHONE_REGEX, "Số điện thoại không hợp lệ")
    .required("Số điện thoại chủ hồ không dược bỏ trống"),
  additionalInformation: yup.string().max(255, "Mô tả tối đa 255 ký tự"),
  address: yup.string().max(255, "Địa chỉ tối đa 255 ký tự"),
  website: yup.string(),
});

export const ADMIN_BLACKLIST_ADD_FORM = yup.object().shape({
  description: yup.string().max(255, "Mô tả tối đa 255 ký tự"),
  phone: yup
    .string()
    .matches(VN_PHONE_REGEX, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không dược bỏ trống"),
  imageArray: yup.array().min(0),
});
export const ADMIN_ACCOUNT_DEACTIVATE_FORM = yup.object().shape({
  description: yup.string().max(255, "Mô tả tối đa 255 ký tự"),
  imageArray: yup.array().min(0),
});

export const FMANAGE_POST_FORM = yup.object().shape({
  postType: yup.string().required("Loại bài đăng không được bỏ trống"),
  content: yup.string().required("Nội dung bài đăng không được bỏ trống"),
  attachmentType: yup.string().required("Chọn loại đính kèm"),
  imageArray: yup.array().when("attachmentType", {
    is: "IMAGE",
    then: yup.array().min(1, "Hãy chọn ảnh cho bài đăng"),
  }),
  mediaUrl: yup.string().when("attachmentType", {
    is: "VIDEO",
    then: yup.string().required("Link video không được bỏ trống"),
  }),
});

export const REGISTER_PHONE_AND_PASS_FORM = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(VN_PHONE_REGEX, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không được bỏ trống"),
  password: yup
    .string()
    .required("Mật khẩu không được bỏ trống")
    .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự"),
  passwordConfirmation: yup
    .string()
    .required("Trường này không được bỏ trống")
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
});

export const CHANGE_PHONE_NUMBER_FORM = yup.object().shape({
  phone: yup
    .string()
    .matches(VN_PHONE_REGEX, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không dược bỏ trống"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự")
    .required("Mật khẩu không được bỏ trống"),
});

export const REGISTER_INFORMATION_FORM = yup.object().shape({
  fullName: yup.string().required("Họ và tên không được bỏ trống"),
  gender: yup.bool(),
  dob: yup.mixed().required("Ngày sinh không được bỏ trống"),
  address: yup.string().ensure(),
  provinceId: yup.number().default(1),
  districtId: yup.number().default(1),
  wardId: yup.number().default(1),
});

export const LOGIN_FORM = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Số điện thoại không được bỏ trống")
    .matches(VN_PHONE_REGEX, "Số điện thoại không hợp lệ")
    .label("PhoneNumber"),
  password: yup
    .string()
    .required("Mật khẩu không được bỏ trống")
    .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự")
    .label("Password"),
});

export const PHONE_NUMBER = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Số điện thoại không được bỏ trống")
    .matches(VN_PHONE_REGEX, "Số điện thoại không hợp lệ"),
});

export const FORGOT_PASSWORD_FORM = yup.object().shape({
  password: yup
    .string()
    .required("Mật khẩu không được bỏ trống")
    .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự"),
  passwordConfirmation: yup
    .string()
    .required("Mật khẩu không được bỏ trống")
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
});

export const ADMIN_FMANAGE_PROFILE_FORM = yup.object().shape({
  name: yup.string().required("Tên hồ không được bỏ trống"),
  phone: yup.string().matches(VN_PHONE_REGEX, "Số điện thoại không hợp lệ"),
  website: yup.string().typeError("Website không hợp lệ").ensure(),
  address: yup.string().required("Địa chỉ không được bỏ trống"),
  provinceId: yup.number(),
  districtId: yup.number(),
  wardId: yup.number().default(1),
  description: yup.string().ensure(),
  rule: yup.string().ensure(),
  service: yup.string().ensure(),
  timetable: yup.string().ensure(),
});

export const WRITE_REVIEW_FORM = yup.object().shape({
  score: yup.number().moreThan(0, "Số sao không được bỏ trống"),
  description: yup.string().required("Đánh giá không được bỏ trống"),
});

export const WRITE_REPORT_FORM = yup.object().shape({
  content: yup.string().required("Nội dung báo cáo không thể bỏ trống"),
});
