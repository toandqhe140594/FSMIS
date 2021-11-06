import * as yup from "yup";

export const ANGLER_PROFILE_FORM = yup.object().shape({
  fullName: yup.string().required("Họ và tên không thể bỏ trống"),
  gender: yup.bool(),
  aAddress: yup.string(),
  provinceId: yup.number(),
  districtId: yup.number(),
  wardId: yup.number(),
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
export const FMANAGE_PROFILE_FORM = yup.object().shape({
  name: yup.string().required("Tên địa điểm không thể bỏ trống"),
  phone: yup
    .string()
    .matches(/((09|03|07|08|05)+([0-9]{8})\b)/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không dược bỏ trống"),
  website: yup.string(),
  address: yup.string().required("Địa chỉ không được để trống"),
  provinceId: yup.number().required("Tỉnh/Thành phố không được để trống"),
  districtId: yup.number().required("Quận/Huyện không được để trống"),
  wardId: yup.number().required("Phường/xã không được để trống"),
  description: yup.string().required("Hãy viết một vài điều về địa điểm"),
  rule: yup.string(),
  service: yup.string(),
  timetable: yup.string().required("Hãy nêu rõ lịch biểu của hồ"),
});