import * as yup from "yup";

export const ANGLER_PROFILE_FORM = yup.object().shape({
  fullName: yup.string().required("Họ và tên không thể bỏ trống"),
  gender: yup.bool(),
  address: yup.string(),
  provinceId: yup.number(),
  districtId: yup.number(),
  wardId: yup.number(),
});

export const ANGLER_CATCH_REPORT_FORM = yup.object().shape({
  aCaption: yup.string().required("Hãy viết suy nghĩ của bạn về ngày câu"),
  aLakeType: yup
    .number()
    .typeError("Trường này chỉ được nhập số")
    .required("Loại hồ không được để trống"),
  isPublic: yup.bool(),
  isReleased: yup.bool(),
  cards: yup.array().of(
    yup.object().shape({
      fishType: yup
        .number()
        .typeError("Trường này chỉ được nhập số")
        .required("Loại cá không được để trống"),
      catches: yup
        .number()
        .typeError("Trường này chỉ được nhập số")
        .required("Số cá bắt được không được để trống"),
      totalWeight: yup
        .number()
        .typeError("Trường này chỉ được nhập số")
        .required("Tổng cân nặng cá không được để trống"),
      isReleased: yup.bool().default(false),
    }),
  ),
});

export const FMANAGE_LAKE_FORM = yup.object().shape({
  name: yup.string().required("Tên hồ không thể bỏ trống"),
  price: yup.string().required("Miêu tả giá vé ở hồ này"),
  methods: yup.array().min(1, "Trường này kia không được để trống"),
  length: yup
    .number()
    .typeError("Trường này chỉ được nhập số")
    .required("Chiều dài hồ không được để trống"),
  width: yup
    .number()
    .typeError("Trường này chỉ được nhập số")
    .required("Chiều rộng hồ không được để trống"),
  depth: yup.number().required("Độ sâu của hồ không được để trống"),
  fishInLakeList: yup.array().of(
    yup.object().shape({
      fishSpeciesId: yup.number().required("Trường này không được để trống"),
      quantity: yup
        .number()
        .typeError("Trường này chỉ được nhập số")
        .required("Số cá được không được để trống"),
      totalWeight: yup
        .number()
        .typeError("Trường này chỉ được nhập số")
        .required("Cân nặng không được để trống"),
      minWeight: yup
        .number()
        .typeError("Trường này chỉ được nhập số")
        .required("Biểu nhỏ không được để trống"),
      maxWeight: yup
        .number()
        .typeError("Trường này chỉ được nhập số")
        .required("Biểu lớn không được để trống"),
    }),
  ),
});

export const FISH_EDIT_FORM = yup.object().shape({
  quantity: yup
    .number()
    .typeError("Không phải số")
    .test("positive", "Phải là số dương", (value) => value >= 0)
    .test("integer", "Phải là số nguyên", (value) => Number.isInteger(value)),
  weight: yup
    .number()
    .typeError("Không phải số")
    .test("positive", "Phải là số dương", (value) => value >= 0),
});

export const FMANAGE_LAKE_FISH_FORM = yup.object().shape({
  fishSpeciesId: yup.number().required("Trường này không được để trống"),
  quantity: yup
    .number()
    .typeError("Trường này chỉ được nhập số")
    .required("Số cá được không được để trống"),
  totalWeight: yup
    .number()
    .typeError("Trường này chỉ được nhập số")
    .required("Cân nặng không được để trống"),
  minWeight: yup
    .number()
    .typeError("Trường này chỉ được nhập số")
    .required("Biểu nhỏ không được để trống"),
  maxWeight: yup
    .number()
    .typeError("Trường này chỉ được nhập số")
    .required("Biểu lớn không được để trống"),
});

export const FMANAGE_PROFILE_FORM = yup.object().shape({
  name: yup.string().required("Tên địa điểm không thể bỏ trống"),
  phone: yup
    .string()
    .matches(/((09|03|07|08|05)+([0-9]{8})\b)/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không dược bỏ trống"),
  website: yup.string().typeError("Website không hợp lệ"),
  address: yup.string().required("Địa chỉ không được để trống"),
  provinceId: yup.number().required("Tỉnh/Thành phố không được để trống"),
  districtId: yup.number().required("Quận/Huyện không được để trống"),
  wardId: yup.number().required("Phường/xã không được để trống"),
  description: yup.string().required("Hãy viết một vài điều về địa điểm"),
  rule: yup.string().required("Ghi không có nếu để trống nội quy"),
  service: yup.string().required("Ghi không có nếu để trống dịch vụ"),
  timetable: yup.string().required("Hãy nêu rõ lịch biểu của hồ"),
});
