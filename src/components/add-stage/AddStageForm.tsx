"use client";

import React, { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { CustomButton } from "../CustomButton";
import { addStageSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { countiesData } from "@/data/countyData";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addstage } from "../../../actions/addstage";
import FormSuccess from "../ui/form-success";
import FormError from "../ui/form-error";
import {
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation } from "@/hooks/useLocation";

import AddMemberForm from "./AddMemberForm";

interface Location {
  latitude: number;
  longitude: number;
}

const AddStageForm = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [locationAdded, setLocationAdded] = useState<boolean>(false); // Track if location is added
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | "">("");
  const [isSuccess, setSuccess] = useState<string | "">("");
  const router = useRouter(); // Initialize the useRouter hook

  const form = useForm<z.infer<typeof addStageSchema>>({
    resolver: zodResolver(addStageSchema),
    defaultValues: {
      stageName: "",
      county: "",
      sub_county: "",
      ward: "",
      longitude: "",
      latitude: "",
    },
  });

  const onSubmit = (values: z.infer<typeof addStageSchema>) => {
    setError(""), setSuccess("");

    startTransition(() => {
      addstage(values).then((data) => {
        if (data.error) {
          setError(data.error);
        } else if (data.success) {
          setSuccess(data.success);
          router.push("/profile");
        }
      });
    });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      console.log("Geolocation not supported");
    }
  };

  const success = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLocation({ latitude, longitude });
    form.setValue("latitude", latitude.toString());
    form.setValue("longitude", longitude.toString());

    setLocationAdded(true);

    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    selectedCounty,
    selectedSubCounty,
    selectedWard,
    handleCountyChange,
    handleSubCountyChange,
    handleWardChange,
  } = useLocation(countiesData);

  return (
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <h2 className="text-2xl font-bold titlecase leading-[48px]">
            Add Stage & Members
          </h2>
          <FormField
            control={form.control}
            name="stageName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stage Name</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="county"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chagua Kaunti Yako</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleCountyChange(value); // Update subcounty options based on selected county
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Kaunti" />
                    </SelectTrigger>
                    <SelectContent>
                      {countiesData.map((county) => (
                        <SelectItem
                          key={county.county_code}
                          value={county.county_name}
                        >
                          {county.county_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4 items-center justify-between">
            {/* SubCounty Selector */}
            <FormField
              control={form.control}
              name="sub_county"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chagua Kaunti Ndogo</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleSubCountyChange(value); // Update ward options based on selected subcounty
                      }}
                      defaultValue={field.value}
                      disabled={!selectedCounty}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Kaunti Ndogo" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCounty?.sub_counties.map((subCounty) => (
                          <SelectItem
                            key={subCounty.subcounty_name}
                            value={subCounty.subcounty_name}
                          >
                            {subCounty.subcounty_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ward Selector */}
            <FormField
              control={form.control}
              name="ward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chagua Ward Yako</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleWardChange(value); // Update stage options based on selected ward
                      }}
                      defaultValue={field.value}
                      disabled={!selectedSubCounty}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Ward" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedSubCounty?.wards.map((ward) => (
                          <SelectItem
                            key={ward.ward_name}
                            value={ward.ward_name}
                          >
                            {ward.ward_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stage Selector */}
          </div>
          <Button
            type="button"
            className="w-full bg-bhgreen"
            onClick={handleLocationClick}
            disabled={locationAdded} // Disable the button once location is added
          >
            {locationAdded ? "Stage Added" : "Get my stage location"}
          </Button>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      disabled={isPending || locationAdded} // Disable once location is added
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      disabled={isPending || locationAdded} // Disable once location is added
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={isSuccess} />
          <FormError message={error} />
          <Button disabled={isPending} className="w-full bg-bhgreen ">
            Add your Stage
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default AddStageForm;
