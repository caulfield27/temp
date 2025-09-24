import { useState } from 'react';
import { toast } from 'sonner';

import { toasterOptions } from '@/constants';
import { cn } from '@/lib/utils';
import { useGlobalStore } from '@/store/global/globalStore';
import { Avatar, AvatarImage, Button, Card, Input, Title } from '@/ui';

const Organization = () => {
  // zustand store states
  const { organization, updateDomen, addDomen, updateOrgLogo, updateOrgName } =
    useGlobalStore();

  // locale states
  const spanColor = 'text-neutral-400';
  const [inputValues, setInputValues] = useState({
    name: organization.name,
    logo: organization.logo,
    primaryColor: '#f87102',
    secondaryColor: '#ffffff',
  });
  const [domen, setDomen] = useState('');

  // event handlers

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    if (name === 'logo') {
      const file = event.target?.files?.[0];
      if (file) {
        const logoUrl = URL.createObjectURL(file);
        setInputValues((prev) => ({ ...prev, logo: logoUrl }));
      }
    } else {
      setInputValues((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleSaveChanges() {
    updateOrgLogo(inputValues.logo);
    updateOrgName(inputValues.name);
    const root = document.documentElement;

    root.style.setProperty('--primary', inputValues.primaryColor);
    root.style.setProperty('--accent', inputValues.primaryColor);
    root.style.setProperty('--ring', inputValues.primaryColor);
    root.style.setProperty('--primary-foreground', inputValues.secondaryColor);

    toast.success('Изменения успешно сохранены', toasterOptions['success']);
  }

  return (
    <div>
      <Title text="Организация и бренд" />
      <div className="flex flex-row gap-5">
        <Card className="w-[50%] h-fit p-4">
          <div>
            <span className={spanColor}>Наименование</span>
            <Input
              value={inputValues.name}
              onChange={handleInputChange}
              name="name"
              defaultValue={'humo'}
            />
          </div>
          <div>
            <span className={spanColor}>Логотип</span>
            {inputValues.logo ? (
              <div className="flex flex-row gap-5">
                <Avatar>
                  <AvatarImage src={inputValues.logo} alt="Лого" />
                </Avatar>
                <Button
                  variant={'outline'}
                  onClick={() =>
                    setInputValues((prev) => ({ ...prev, logo: null }))
                  }
                >
                  Удалить
                </Button>
              </div>
            ) : (
              <Input
                onChange={handleInputChange}
                name="logo"
                className="cursor-pointer"
                type="file"
                accept=".png"
              />
            )}
          </div>
          <div className="flex flex-row gap-2">
            <div className="w-[50%]">
              <span className={spanColor}>Основной цвет</span>
              <Input
                onChange={handleInputChange}
                name="primaryColor"
                className="cursor-pointer"
                value={inputValues.primaryColor}
                type="color"
              />
            </div>
            <div className="w-[50%]">
              <span className={spanColor}>Дополнительный цвет</span>
              <Input
                onChange={handleInputChange}
                name="secondaryColor"
                className="cursor-pointer"
                value={inputValues.secondaryColor}
                type="color"
              />
            </div>
          </div>
          <Button onClick={handleSaveChanges}>Сохранить</Button>
        </Card>
        <Card className="w-[50%] h-fit p-4">
          <div>
            <span className="font-bold text-neutral-800">Домены</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex w-full max-w-sm items-center gap-2">
              <Input
                value={domen}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setDomen(event.target.value)
                }
                type="text"
                placeholder="example.com"
              />
              <Button
                onClick={() => addDomen(domen)}
                disabled={!domen}
                type="submit"
                variant="outline"
              >
                Добавить
              </Button>
            </div>
            <div className="flex flex-col gap-2.5">
              {organization.domens.map((domen) => {
                return (
                  <div
                    className="p-2.5 rounded-[8px] border-[1px] border-neutral-300 flex flex-row items-center justify-between"
                    key={domen.value}
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-neutral-700">
                        {domen.value}
                      </span>
                      <span
                        className={cn(
                          'text-[12px] font-light text-red-600',
                          domen.isValid && 'text-green-600'
                        )}
                      >
                        {domen.isValid ? 'Проверен' : 'Не проверен'}
                      </span>
                    </div>
                    <Button
                      onClick={() => {
                        updateDomen(domen.value);
                        setDomen('');
                      }}
                      variant={'outline'}
                    >
                      Проверить
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Organization;
