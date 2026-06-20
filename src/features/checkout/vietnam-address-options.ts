export type VietnamProvinceOption = {
  label: string;
  value: string;
  districts: string[];
};

export const vietnamProvinceOptions: VietnamProvinceOption[] = [
  {
    label: "TP. Hồ Chí Minh",
    value: "TP. Hồ Chí Minh",
    districts: [
      "Quận 1",
      "Quận 3",
      "Quận 4",
      "Quận 5",
      "Quận 6",
      "Quận 7",
      "Quận 8",
      "Quận 10",
      "Quận 11",
      "Quận 12",
      "Bình Tân",
      "Bình Thạnh",
      "Gò Vấp",
      "Phú Nhuận",
      "Tân Bình",
      "Tân Phú",
      "Thành phố Thủ Đức",
      "Bình Chánh",
      "Cần Giờ",
      "Củ Chi",
      "Hóc Môn",
      "Nhà Bè",
    ],
  },
];

export const defaultVietnamProvince = vietnamProvinceOptions[0];

export function getVietnamDistrictOptions(provinceValue: string | undefined) {
  return vietnamProvinceOptions.find((province) => province.value === provinceValue)?.districts ?? [];
}
