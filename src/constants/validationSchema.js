import * as yup from "yup";

export const ANGLER_PROFILE_FORM = yup.object().shape({
  avatarUrl: yup.string(),
  fullName: yup.string().required("Họ và tên không thể bỏ trống"),
  gender: yup.bool(),
  address: yup.string(),
  provinceId: yup.number(),
  districtId: yup.number(),
  wardId: yup.number(),
});

export const ANGLER_PROFILE_PASSWORD_CHANGE_FORM = yup.object().shape({
  oldPassword: yup.string().required("Mật khẩu cũ không thể bỏ trống"),
  newPassword: yup.string().required("Mật khẩu mới không thể bỏ trống"),
  repeatPassword: yup
    .string()
    .required("Trường này không thể bỏ trống")
    .oneOf([yup.ref("newPassword"), null], "Mật khẩu không khớp"),
});

export const ANGLER_PROFILE_PHONE_CHANGE_FORM = yup.object().shape({
  phone: yup
    .string()
    .matches(/((09|03|07|08|05)+([0-9]{8})\b)/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không thể bỏ trống"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự")
    .required("Mật khẩu không thể bỏ trống"),
});

export const ANGLER_CATCH_REPORT_FORM = yup.object().shape({
  imageArray: yup.array().min(1, "Hãy chọn tối đa 3 ảnh miêu tả buổi câu"),
  description: yup.string().required("Hãy viết suy nghĩ của bạn về ngày câu"),
  lakeId: yup
    .number()
    .typeError("Trường này chỉ được nhập số")
    .required("Loại hồ không được để trống"),
  hidden: yup.bool(),
  catchesDetailList: yup
    .array()
    .min(1, "Phải có ít nhất một thẻ cá")
    .max(10, "Chỉ được tạo tối đa 10 thẻ cá")
    .of(
      yup.object().shape(
        {
          fishInLakeId: yup
            .number()
            .notOneOf([0], "Loại cá không được để trống")
            .typeError("Trường này chỉ được nhập số")
            .required("Loại cá không được để trống"),
          quantity: yup
            .number()
            .typeError("Trường này chỉ được nhập số")
            .min(0, "Số lượng phải lớn hơn 0")
            .max(9999, "Số lượng tối đa là 9999")
            .test("integer", "Số lượng phải là số nguyên", (value) =>
              Number.isInteger(value),
            )
            .when("weight", {
              is: 0,
              then: yup
                .number()
                .typeError("Trường này chỉ được nhập số")
                .notOneOf(
                  [0],
                  "Một trong hai trường không được để trống hay bằng 0",
                ),
            }),
          weight: yup
            .number()
            .typeError("Trường này chỉ được nhập số")
            .min(0, "Cân nặng phải lớn hơn 0")
            .max(9999, "Cân nặng tối đa là 9999kg")
            .when("quantity", {
              is: 0,
              then: yup
                .number()
                .typeError("Trường này chỉ được nhập số")
                .notOneOf(
                  [0],
                  "Một trong hai trường không được để trống hay bằng 0",
                ),
            }),
          returnToOwner: yup.bool().default(false),
        },
        ["quantity", "weight"],
      ),
    ),
});

export const FMANAGE_LAKE_FORM = yup.object().shape({
  imageArray: yup.array().min(1, "Hãy chọn một ảnh cho hồ"),
  name: yup.string().required("Tên hồ không thể bỏ trống"),
  price: yup.string().required("Miêu tả giá vé ở hồ này"),
  methods: yup.array().min(1, "Trường này không được để trống"),
  length: yup
    .number()
    .min(0.1, "Độ dài phải lớn hơn 0")
    .max(1000, "Độ dài tối đa là 1000m")
    .typeError("Trường này chỉ được nhập số")
    .required("Chiều dài hồ không được để trống"),
  width: yup
    .number()
    .min(0.1, "Độ rộng phải lớn hơn 0")
    .max(1000, "Độ rộng tối đa là 1000m")
    .typeError("Trường này chỉ được nhập số")
    .required("Chiều rộng hồ không được để trống"),
  depth: yup
    .number()
    .min(0.1, "Độ sâu phải lớn hơn 0")
    .max(50, "Độ sâu tối đa là 50m")
    .required("Độ sâu của hồ không được để trống"),
  fishInLakeList: yup
    .array()
    .min(1, "Phải có ít nhất một loại cá trong hồ")
    .max(3, "Tối đa thẻ cá được tạo là 3")
    .of(
      yup.object().shape(
        {
          fishSpeciesId: yup
            .number()
            .required("Trường này không được để trống"),
          minWeight: yup
            .number()
            .typeError("Trường này chỉ được nhập số")
            .min(0.1, "Cân nặng phải lớn hơn 0")
            .max(9999, "Cân nặng tối đa là 9999kg")
            .required("Biểu nhỏ không được để trống"),
          maxWeight: yup
            .number()
            .typeError("Trường này chỉ được nhập số")
            .min(0.1, "Cân nặng phải lớn hơn 0")
            .max(9999, "Cân nặng tối đa là 9999kg")
            .required("Biểu lớn không được để trống"),
          quantity: yup
            .number()
            .typeError("Trường này chỉ được nhập số")
            .min(0, "Số lượng phải lớn hơn 0")
            .max(9999, "Số lượng tối đa là 9999")
            .test("integer", "Phải là số nguyên", (value) =>
              Number.isInteger(value),
            )
            .when("totalWeight", {
              is: 0,
              then: yup
                .number()
                .typeError("Trường này chỉ được nhập số")
                .notOneOf(
                  [0],
                  "Một trong hai trường không được để trống hay bằng 0",
                ),
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
                .notOneOf(
                  [0],
                  "Một trong hai trường không được để trống hay bằng 0",
                ),
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
      .test("integer", "Phải là số nguyên", (value) => Number.isInteger(value))
      .when("weight", {
        is: 0,
        then: yup
          .number()
          .typeError("Trường này chỉ được nhập số")
          .notOneOf([0], "Một trong hai trường không được để trống hay bằng 0"),
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
          .notOneOf([0], "Một trong hai trường không được để trống hay bằng 0"),
      }),
  },
  ["quantity", "weight"],
);

export const FMANAGE_LAKE_FISH_ADD_FORM = yup.object().shape(
  {
    fishSpeciesId: yup.number().required("Trường này không được để trống"),
    minWeight: yup
      .number()
      .typeError("Trường này chỉ được nhập số")
      .min(0.1, "Phải nhập lớn hơn 0")
      .max(9999, "Phải nhập bé hơn hoặc bằng 9999")
      .required("Biểu nhỏ không được để trống"),
    maxWeight: yup
      .number()
      .typeError("Trường này chỉ được nhập số")
      .min(0.1, "Phải nhập lớn hơn 0")
      .max(9999, "Phải nhập bé hơn hoặc bằng 9999")
      .required("Biểu lớn không được để trống"),
    quantity: yup
      .number()
      .typeError("Trường này chỉ được nhập số")
      .min(0, "Số lượng phải lớn hơn 0")
      .max(9999, "Phải nhập số bé hoặc bằng 9999")
      .test("integer", "Phải là số nguyên", (value) => Number.isInteger(value))
      .when("totalWeight", {
        is: 0,
        then: yup
          .number()
          .typeError("Trường này chỉ được nhập số")
          .notOneOf([0], "Một trong hai trường không được để trống hay bằng 0"),
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
          .notOneOf([0], "Một trong hai trường không được để trống hay bằng 0"),
      }),
  },
  ["quantity", "totalWeight"],
);

export const FMANAGE_PROFILE_FORM = yup.object().shape({
  imageArray: yup.array().min(1, "Hãy chọn tối đa 5 ảnh cho hồ"),
  name: yup.string().required("Tên địa điểm không thể bỏ trống"),
  phone: yup
    .string()
    .matches(/((09|03|07|08|05)+([0-9]{8})\b)/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không dược bỏ trống"),
  website: yup.string().typeError("Website không hợp lệ").ensure(),
  address: yup.string().required("Địa chỉ không được để trống"),
  provinceId: yup
    .number()
    .moreThan(0, "Tỉnh/Thành phố không được để trống")
    .required("Tỉnh/Thành phố không được để trống"),
  districtId: yup
    .number()
    .moreThan(0, "Quận/Huyện không được để trống")
    .required("Quận/Huyện không được để trống"),
  wardId: yup
    .number()
    .moreThan(0, "Phường/xã không được để trống")
    .required("Phường/xã không được để trống"),
  description: yup.string().required("Hãy viết một vài điều về địa điểm"),
  rule: yup.string().required("Ghi không có nếu để trống nội quy"),
  service: yup.string().required("Ghi không có nếu để trống dịch vụ"),
  timetable: yup.string().required("Hãy nêu rõ lịch biểu của hồ"),
});

export const ADMIN_FISH_ADD_EDIT_FORM = yup.object().shape({
  name: yup.string().required("Tên cá không thể bỏ trống"),
  imageArray: yup.array().min(1, "Hãy chọn ảnh cho loại cá"),
});

export const ADMIN_FISHING_METHOD_ADD_FORM = yup.object().shape({
  name: yup.string().required("Tên loại hình không thể bỏ trống"),
});

export const FMANAGE_SUGGESTION_FORM = yup.object().shape({
  locationName: yup.string().required("Tên khu hồ không thể bỏ trống"),
  ownerPhone: yup
    .string()
    .matches(/((09|03|07|08|05)+([0-9]{8})\b)/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại chủ hồ không dược bỏ trống"),
  description: yup.string().max(255, "Mô tả tối đa 255 ký tự"),
});

export const ADMIN_BLACKLIST_ADD_FORM = yup.object().shape({
  description: yup.string().max(255, "Mô tả tối đa 255 ký tự"),
  phone: yup
    .string()
    .matches(/((09|03|07|08|05)+([0-9]{8})\b)/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không dược bỏ trống"),
});

export const FMANAGE_POST_FORM = yup.object().shape({
  postType: yup.string().required("Loại bài đăng không được để trống"),
  content: yup.string().required("Nội dung bài đăng không được để trống"),
  attachmentType: yup.string().required("Chọn loại đính kèm"),
  imageArray: yup.array().when("attachmentType", {
    is: "IMAGE",
    then: yup.array().min(1, "Hãy chọn ảnh cho bài đăng"),
  }),
  mediaUrl: yup.string().when("attachmentType", {
    is: "VIDEO",
    then: yup.string().required("Link video không được để trống"),
  }),
});

export const REGISTER_PHONE_AND_PASS_FORM = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Số điện thoại không thể bỏ trống")
    .label("PhoneNumber"),
  password: yup
    .string()
    .required("Mật khẩu không thể bỏ trống")
    .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự"),
  passwordConfirmation: yup
    .string()
    .required("Trường này không thể bỏ trống")
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
});

export const CHANGE_PHONE_NUMBER_FORM = yup.object().shape({
  phone: yup
    .string()
    .matches(/((09|03|07|08|05)+([0-9]{8})\b)/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không dược bỏ trống"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự")
    .required("Mật khẩu không được bỏ trống"),
});
