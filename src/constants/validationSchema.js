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
  imageArray: yup.array().min(1, "Hãy chọn một ảnh cho hồ"),
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
            .min(1, "Phải nhập bè hoặc lớn hơn 1")
            .max(999, "Phải nhập số bé hoặc bằng 999")
            .required("Biểu nhỏ không được để trống"),
          maxWeight: yup
            .number()
            .typeError("Trường này chỉ được nhập số")
            .min(1, "Phải nhập bè hoặc lớn hơn 1")
            .max(999, "Phải nhập số bé hoặc bằng 999")
            .required("Biểu lớn không được để trống"),
          quantity: yup
            .number()
            .typeError("Trường này chỉ được nhập số")
            .test("positive", "Phải là số dương", (value) => value >= 0)
            .max(999, "Phải nhập số bé hoặc bằng 999")
            .test("integer", "Phải là số nguyên", (value) =>
              Number.isInteger(value),
            )
            .when("totalWeight", {
              is: 0,
              then: yup
                .number()
                .typeError("Trường này chỉ được nhập số")
                .test(
                  "shouldNotEmptyOrZero",
                  "Một trong hai trường không được để trống hay bằng 0",
                  (value) => value !== 0,
                ),
            }),
          totalWeight: yup
            .number()
            .typeError("Trường này chỉ được nhập số")
            .test("positive", "Phải là số dương", (value) => value >= 0)
            .max(999, "Phải nhập số bé hoặc bằng 999")
            .when("quantity", {
              is: 0,
              then: yup
                .number()
                .typeError("Trường này chỉ được nhập số")
                .test(
                  "shouldNotEmptyOrZero",
                  "Một trong hai trường không được để trống hay bằng 0",
                  (value) => value !== 0,
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
      .test("positive", "Phải là số dương", (value) => value >= 0)
      .max(999, "Phải nhập số bé hoặc bằng 999")
      .test("integer", "Phải là số nguyên", (value) => Number.isInteger(value))
      .when("weight", {
        is: 0,
        then: yup
          .number()
          .typeError("Trường này chỉ được nhập số")
          .test(
            "shouldNotEmptyOrZero",
            "Một trong hai trường không được để trống hay bằng 0",
            (value) => value !== 0,
          ),
      }),
    weight: yup
      .number()
      .typeError("Trường này chỉ được nhập số")
      .test("positive", "Phải là số dương", (value) => value >= 0)
      .max(999, "Phải nhập số bé hoặc bằng 999")
      .when("quantity", {
        is: 0,
        then: yup
          .number()
          .typeError("Trường này chỉ được nhập số")
          .test(
            "shouldNotEmptyOrZero",
            "Một trong hai trường không được để trống hay bằng 0",
            (value) => value !== 0,
          ),
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
      .min(1, "Phải nhập lớn hơn hoặc bằng 1")
      .max(999, "Phải nhập bé hơn hoặc bằng 999")
      .required("Biểu nhỏ không được để trống"),
    maxWeight: yup
      .number()
      .typeError("Trường này chỉ được nhập số")
      .max(999, "Phải nhập bé hơn hoặc bằng 999")
      .min(1, "Phải nhập lớn hơn hoặc bằng 1")
      .required("Biểu lớn không được để trống"),
    quantity: yup
      .number()
      .typeError("Trường này chỉ được nhập số")
      .test("positive", "Phải là số dương", (value) => value >= 0)
      .max(999, "Phải nhập số bé hoặc bằng 999")
      .test("integer", "Phải là số nguyên", (value) => Number.isInteger(value))
      .when("totalWeight", {
        is: 0,
        then: yup
          .number()
          .typeError("Trường này chỉ được nhập số")
          .test(
            "shouldNotEmptyOrZero",
            "Một trong hai trường không được để trống hay bằng 0",
            (value) => value !== 0,
          ),
      }),
    totalWeight: yup
      .number()
      .typeError("Trường này chỉ được nhập số")
      .test("positive", "Phải là số dương", (value) => value >= 0)
      .max(999, "Phải nhập số bé hoặc bằng 999")
      .when("quantity", {
        is: 0,
        then: yup
          .number()
          .typeError("Trường này chỉ được nhập số")
          .test(
            "shouldNotEmptyOrZero",
            "Một trong hai trường không được để trống hay bằng 0",
            (value) => value !== 0,
          ),
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
  provinceId: yup.number().required("Tỉnh/Thành phố không được để trống"),
  districtId: yup.number().required("Quận/Huyện không được để trống"),
  wardId: yup.number().required("Phường/xã không được để trống"),
  description: yup.string().required("Hãy viết một vài điều về địa điểm"),
  rule: yup.string().required("Ghi không có nếu để trống nội quy"),
  service: yup.string().required("Ghi không có nếu để trống dịch vụ"),
  timetable: yup.string().required("Hãy nêu rõ lịch biểu của hồ"),
});

export const ADMIN_FISH_ADD_EDIT_FORM = yup.object().shape({
  fishName: yup.string().required("Tên cá không thể bỏ trống"),
  fishImage: yup.array().min(1, "Hãy chọn ảnh cho loại cá"),
});

export const FMANAGE_SUGGESTION_FORM = yup.object().shape({
  locationName: yup.string().required("Tên khu hồ không thể bỏ trống"),
  ownerPhone: yup.string().required("Số điện thoại chủ hồ không thể bỏ trống"),
});
